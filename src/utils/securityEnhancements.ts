
import DOMPurify from 'dompurify';

// Enhanced HTML sanitization with stricter rules
export const strictSanitizeHtml = (dirty: string): string => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [], // No HTML tags allowed in most user inputs
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
  });
};

// Content sanitization for rich text (descriptions, etc.)
export const contentSanitizeHtml = (dirty: string): string => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
  });
};

// Enhanced rate limiting with different strategies
export class EnhancedRateLimiter {
  private attempts: Map<string, { count: number; windowStart: number }> = new Map();
  
  isAllowed(
    key: string, 
    maxAttempts: number = 5, 
    windowMs: number = 60000,
    strategy: 'sliding' | 'fixed' = 'sliding'
  ): boolean {
    const now = Date.now();
    const existing = this.attempts.get(key);
    
    if (strategy === 'sliding') {
      return this.slidingWindowCheck(key, maxAttempts, windowMs, now);
    } else {
      return this.fixedWindowCheck(key, maxAttempts, windowMs, now);
    }
  }
  
  private slidingWindowCheck(key: string, maxAttempts: number, windowMs: number, now: number): boolean {
    const existing = this.attempts.get(key);
    
    if (!existing) {
      this.attempts.set(key, { count: 1, windowStart: now });
      return true;
    }
    
    // If window has expired, reset
    if (now - existing.windowStart >= windowMs) {
      this.attempts.set(key, { count: 1, windowStart: now });
      return true;
    }
    
    // Check if within limits
    if (existing.count >= maxAttempts) {
      return false;
    }
    
    // Increment counter
    this.attempts.set(key, { 
      count: existing.count + 1, 
      windowStart: existing.windowStart 
    });
    return true;
  }
  
  private fixedWindowCheck(key: string, maxAttempts: number, windowMs: number, now: number): boolean {
    const windowStart = Math.floor(now / windowMs) * windowMs;
    const existing = this.attempts.get(key);
    
    if (!existing || existing.windowStart !== windowStart) {
      this.attempts.set(key, { count: 1, windowStart });
      return true;
    }
    
    if (existing.count >= maxAttempts) {
      return false;
    }
    
    this.attempts.set(key, { 
      count: existing.count + 1, 
      windowStart: existing.windowStart 
    });
    return true;
  }
  
  // Clean up old entries
  cleanup(): void {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    
    for (const [key, data] of this.attempts.entries()) {
      if (now - data.windowStart > oneHour) {
        this.attempts.delete(key);
      }
    }
  }
}

// Global enhanced rate limiter instance
export const enhancedRateLimiter = new EnhancedRateLimiter();

// Clean up rate limiter every hour
setInterval(() => {
  enhancedRateLimiter.cleanup();
}, 60 * 60 * 1000);

// Secure guest user handling
export const generateSecureGuestIdentifier = (): string => {
  const array = new Uint8Array(20);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Enhanced password validation
export const validateStrongPassword = (password: string): { isValid: boolean; errors: string[]; score: number } => {
  const errors: string[] = [];
  let score = 0;
  
  // Length check
  if (password.length < 12) {
    errors.push('Password must be at least 12 characters long');
  } else {
    score += 1;
  }
  
  // Character variety checks
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  } else {
    score += 1;
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  } else {
    score += 1;
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  } else {
    score += 1;
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  } else {
    score += 1;
  }
  
  // Check for common patterns
  if (/(.)\1{2,}/.test(password)) {
    errors.push('Password should not contain repeated characters');
    score -= 1;
  }
  
  // Dictionary/common password check (simplified)
  const commonPasswords = ['password', '123456', 'qwerty', 'admin', 'letmein'];
  if (commonPasswords.some(common => password.toLowerCase().includes(common))) {
    errors.push('Password should not contain common words');
    score -= 1;
  }
  
  return {
    isValid: errors.length === 0 && score >= 4,
    errors,
    score: Math.max(0, Math.min(5, score))
  };
};

// Input validation helpers
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 100;
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
  return phoneRegex.test(phone);
};

export const validateZipCode = (zipCode: string): boolean => {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zipCode);
};

// Content Security Policy helpers
export const generateNonce = (): string => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode.apply(null, Array.from(array)));
};
