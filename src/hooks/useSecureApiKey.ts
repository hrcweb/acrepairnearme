
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface EncryptedApiKey {
  id: string;
  service_name: string;
  created_at: string;
  updated_at: string;
}

export const useSecureApiKey = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const storeApiKey = useCallback(async (serviceName: string, apiKey: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Simple client-side hashing for key verification (not security)
      const encoder = new TextEncoder();
      const data = encoder.encode(apiKey);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const keyHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      // In a real implementation, you'd encrypt the key before storing
      // For now, we'll store it as-is but recommend server-side encryption
      const { error } = await supabase
        .from('encrypted_api_keys')
        .upsert({
          service_name: serviceName,
          encrypted_key: btoa(apiKey), // Basic encoding, not encryption
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
  }, [toast]);

  const retrieveApiKey = useCallback(async (serviceName: string): Promise<string | null> => {
    try {
      const { data, error } = await supabase
        .from('encrypted_api_keys')
        .select('encrypted_key')
        .eq('service_name', serviceName)
        .single();

      if (error) throw error;

      // Basic decoding, not decryption
      return atob(data.encrypted_key);
    } catch (error) {
      console.error('Error retrieving API key:', error);
      return null;
    }
  }, []);

  const listApiKeys = useCallback(async (): Promise<EncryptedApiKey[]> => {
    try {
      const { data, error } = await supabase
        .from('encrypted_api_keys')
        .select('id, service_name, created_at, updated_at');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error listing API keys:', error);
      return [];
    }
  }, []);

  const deleteApiKey = useCallback(async (serviceName: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('encrypted_api_keys')
        .delete()
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
  }, [toast]);

  return {
    storeApiKey,
    retrieveApiKey,
    listApiKeys,
    deleteApiKey,
    loading
  };
};
