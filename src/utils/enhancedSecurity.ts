
import { supabase } from '@/integrations/supabase/client';

// Enhanced authentication security utilities
export class AuthSecurityService {
  // Check for suspicious login patterns
  static async logSecurityEvent(
    userId: string | null,
    eventType: string,
    details: Record<string, any> = {}
  ): Promise<void> {
    try {
      if (!userId) return;
      
      await supabase.from('user_events').insert({
        user_id: userId,
        event_type: eventType,
        description: `Security event: ${eventType}`,
        event_data: {
          ...details,
          timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent,
          ip_info: 'client-side' // In production, get from server
        }
      });
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  }
  
  // Enhanced session validation
  static async validateSession(): Promise<boolean> {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        return false;
      }
      
      // Check if session is close to expiry (within 5 minutes)
      const expiresAt = new Date(session.expires_at! * 1000);
      const now = new Date();
      const fiveMinutes = 5 * 60 * 1000;
      
      if (expiresAt.getTime() - now.getTime() < fiveMinutes) {
        // Attempt to refresh
        const { error: refreshError } = await supabase.auth.refreshSession();
        if (refreshError) {
          console.warn('Failed to refresh session:', refreshError);
          return false;
        }
      }
      
      return true;
    } catch (error) {
      console.error('Session validation failed:', error);
      return false;
    }
  }
  
  // Secure logout with cleanup
  static async secureLogout(userId?: string): Promise<void> {
    try {
      if (userId) {
        await this.logSecurityEvent(userId, 'user_logout', { 
          method: 'manual' 
        });
      }
      
      // Clear any sensitive localStorage data
      const keysToRemove = Object.keys(localStorage).filter(key => 
        key.includes('firecrawl') || 
        key.includes('api') || 
        key.includes('token')
      );
      
      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
      });
      
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Secure logout failed:', error);
    }
  }
}

// Enhanced business data validation
export class BusinessSecurityService {
  // Validate business ownership before operations
  static async validateBusinessOwnership(
    businessId: number, 
    userId: string
  ): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('user_id')
        .eq('id', businessId)
        .single();
      
      if (error || !data) {
        return false;
      }
      
      return data.user_id === userId;
    } catch (error) {
      console.error('Business ownership validation failed:', error);
      return false;
    }
  }
  
  // Check for duplicate business submissions
  static async checkDuplicateBusiness(
    name: string, 
    address: string, 
    userId: string
  ): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('id')
        .eq('user_id', userId)
        .ilike('name', name.trim())
        .ilike('address', address.trim())
        .limit(1);
      
      if (error) {
        console.error('Duplicate check failed:', error);
        return false;
      }
      
      return (data?.length || 0) > 0;
    } catch (error) {
      console.error('Duplicate business check failed:', error);
      return false;
    }
  }
}

// API Key security enhancements
export class ApiKeySecurityService {
  // Validate API key format before storage
  static validateApiKeyFormat(serviceName: string, apiKey: string): boolean {
    const patterns: Record<string, RegExp> = {
      'openai': /^sk-[A-Za-z0-9]{48}$/,
      'firecrawl': /^fc-[A-Za-z0-9]{32}$/,
      'stripe': /^sk_(test|live)_[A-Za-z0-9]{24}$/,
      'elevenlabs': /^[A-Za-z0-9]{32}$/
    };
    
    const pattern = patterns[serviceName.toLowerCase()];
    if (!pattern) {
      // For unknown services, just check it's not empty and reasonable length
      return apiKey.length > 10 && apiKey.length < 200;
    }
    
    return pattern.test(apiKey);
  }
  
  // Encrypt API key before storage (client-side encryption as additional layer)
  static async encryptApiKey(apiKey: string, userSecret: string): Promise<string> {
    try {
      const encoder = new TextEncoder();
      const keyMaterial = await crypto.subtle.importKey(
        'raw',
        encoder.encode(userSecret),
        { name: 'PBKDF2' },
        false,
        ['deriveKey']
      );
      
      const key = await crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt: encoder.encode('supabase-ac-repair'),
          iterations: 100000,
          hash: 'SHA-256'
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt']
      );
      
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        encoder.encode(apiKey)
      );
      
      const combined = new Uint8Array(iv.length + encrypted.byteLength);
      combined.set(iv);
      combined.set(new Uint8Array(encrypted), iv.length);
      
      return btoa(String.fromCharCode.apply(null, Array.from(combined)));
    } catch (error) {
      console.error('API key encryption failed:', error);
      return btoa(apiKey); // Fallback to base64
    }
  }
  
  // Decrypt API key after retrieval
  static async decryptApiKey(encryptedKey: string, userSecret: string): Promise<string> {
    try {
      const combined = new Uint8Array(atob(encryptedKey).split('').map(char => char.charCodeAt(0)));
      const iv = combined.slice(0, 12);
      const encrypted = combined.slice(12);
      
      const encoder = new TextEncoder();
      const keyMaterial = await crypto.subtle.importKey(
        'raw',
        encoder.encode(userSecret),
        { name: 'PBKDF2' },
        false,
        ['deriveKey']
      );
      
      const key = await crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt: encoder.encode('supabase-ac-repair'),
          iterations: 100000,
          hash: 'SHA-256'
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['decrypt']
      );
      
      const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        key,
        encrypted
      );
      
      return new TextDecoder().decode(decrypted);
    } catch (error) {
      console.error('API key decryption failed:', error);
      return atob(encryptedKey); // Fallback to base64 decode
    }
  }
}
