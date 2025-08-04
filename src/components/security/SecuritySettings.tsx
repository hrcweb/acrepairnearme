
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useSecureApiKey } from '@/hooks/useSecureApiKey';
import { Trash2, Eye, EyeOff } from 'lucide-react';

const SecuritySettings = () => {
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [newApiKey, setNewApiKey] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const { toast } = useToast();
  const { storeApiKey, listApiKeys, deleteApiKey, loading } = useSecureApiKey();

  useEffect(() => {
    loadApiKeys();
  }, []);

  const loadApiKeys = async () => {
    const keys = await listApiKeys();
    setApiKeys(keys);
  };

  const handleStoreApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!serviceName.trim() || !newApiKey.trim()) {
      toast({
        title: "Validation Error",
        description: "Please provide both service name and API key",
        variant: "destructive",
      });
      return;
    }

    const success = await storeApiKey(serviceName.trim(), newApiKey.trim());
    if (success) {
      setServiceName('');
      setNewApiKey('');
      loadApiKeys();
    }
  };

  const handleDeleteApiKey = async (service: string) => {
    const success = await deleteApiKey(service);
    if (success) {
      loadApiKeys();
    }
  };

  const toggleShowKey = (keyId: string) => {
    setShowKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Key Management</CardTitle>
          <CardDescription>
            Securely store and manage your API keys for external services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleStoreApiKey} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="serviceName">Service Name</Label>
                <Input
                  id="serviceName"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  placeholder="e.g., firecrawl, openai"
                  maxLength={50}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={newApiKey}
                  onChange={(e) => setNewApiKey(e.target.value)}
                  placeholder="Enter your API key"
                  maxLength={200}
                />
              </div>
            </div>
            
            <Button type="submit" disabled={loading}>
              {loading ? "Storing..." : "Store API Key"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stored API Keys</CardTitle>
          <CardDescription>
            View and manage your stored API keys
          </CardDescription>
        </CardHeader>
        <CardContent>
          {apiKeys.length === 0 ? (
            <p className="text-gray-500">No API keys stored yet</p>
          ) : (
            <div className="space-y-4">
              {apiKeys.map((key) => (
                <div key={key.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{key.service_name}</h3>
                    <p className="text-sm text-gray-500">
                      Added: {new Date(key.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleShowKey(key.id)}
                    >
                      {showKeys[key.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteApiKey(key.service_name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Best Practices</CardTitle>
          <CardDescription>
            Follow these guidelines to keep your application secure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>• Use strong, unique passwords with at least 8 characters</li>
            <li>• Enable two-factor authentication when available</li>
            <li>• Regularly rotate your API keys</li>
            <li>• Never share your API keys in public repositories</li>
            <li>• Monitor your API usage for unusual activity</li>
            <li>• Keep your browser and applications updated</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettings;
