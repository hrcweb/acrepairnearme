
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { ApiKeySecurityService } from '@/utils/enhancedSecurity';

interface EncryptedApiKey {
  id: string;
  service_name: string;
  created_at: string;
  updated_at: string;
}

export const useSecureApiKey = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const storeApiKey = useCallback(async (serviceName: string, apiKey: string): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to store API keys",
        variant: "destructive",
      });
      return false;
    }

    // Validate API key format
    if (!ApiKeySecurityService.validateApiKeyFormat(serviceName, apiKey)) {
      toast({
        title: "Invalid API key format",
        description: `The ${serviceName} API key format appears to be invalid`,
        variant: "destructive",
      });
      return false;
    }

    setLoading(true);
    try {
      // Enhanced encryption using user ID as additional entropy
      const userSecret = user.id + serviceName;
      const encryptedKey = await ApiKeySecurityService.encryptApiKey(apiKey, userSecret);
      
      // Simple client-side hashing for verification
      const encoder = new TextEncoder();
      const data = encoder.encode(apiKey);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const keyHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      const { error } = await supabase
        .from('encrypted_api_keys')
        .upsert({
          user_id: user.id,
          service_name: serviceName,
          encrypted_key: encryptedKey,
          key_hash: keyHash,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: `${serviceName} API key stored securely`,
      });
      
      return true;
    } catch (error) {
      console.error('Error storing API key:', error);
      toast({
        title: "Error",
        description: "Failed to store API key",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [toast, user]);

  const retrieveApiKey = useCallback(async (serviceName: string): Promise<string | null> => {
    if (!user) {
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('encrypted_api_keys')
        .select('encrypted_key')
        .eq('user_id', user.id)
        .eq('service_name', serviceName)
        .single();

      if (error) throw error;

      // Enhanced decryption using user ID as additional entropy
      const userSecret = user.id + serviceName;
      return await ApiKeySecurityService.decryptApiKey(data.encrypted_key, userSecret);
    } catch (error) {
      console.error('Error retrieving API key:', error);
      return null;
    }
  }, [user]);

  const listApiKeys = useCallback(async (): Promise<EncryptedApiKey[]> => {
    if (!user) {
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('encrypted_api_keys')
        .select('id, service_name, created_at, updated_at')
        .eq('user_id', user.id);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error listing API keys:', error);
      return [];
    }
  }, [user]);

  const deleteApiKey = useCallback(async (serviceName: string): Promise<boolean> => {
    if (!user) {
      return false;
    }

    try {
      const { error } = await supabase
        .from('encrypted_api_keys')
        .delete()
        .eq('user_id', user.id)
        .eq('service_name', serviceName);

      if (error) throw error;

      toast({
        title: "Success",
        description: `${serviceName} API key deleted`,
      });
      
      return true;
    } catch (error) {
      console.error('Error deleting API key:', error);
      toast({
        title: "Error",
        description: "Failed to delete API key",
        variant: "destructive",
      });
      return false;
    }
  }, [toast, user]);

  return {
    storeApiKey,
    retrieveApiKey,
    listApiKeys,
    deleteApiKey,
    loading
  };
};
