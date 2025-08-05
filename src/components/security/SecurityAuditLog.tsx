
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, AlertTriangle, Info, CheckCircle } from 'lucide-react';

interface SecurityEvent {
  id: string;
  event_type: string;
  description: string;
  event_data: any;
  created_at: string;
}

const SecurityAuditLog = () => {
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    loadSecurityEvents();
  }, []);

  const loadSecurityEvents = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_events')
        .select('id, event_type, description, event_data, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error loading security events:', error);
      toast({
        title: "Error",
        description: "Failed to load security audit log",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getEventIcon = (eventType: string) => {
    if (eventType.includes('failed') || eventType.includes('error')) {
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
    if (eventType.includes('login') || eventType.includes('logout')) {
      return <Shield className="h-4 w-4 text-blue-500" />;
    }
    if (eventType.includes('created') || eventType.includes('success')) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    return <Info className="h-4 w-4 text-gray-500" />;
  };

  const getEventSeverity = (eventType: string): string => {
    if (eventType.includes('failed') || eventType.includes('error')) return 'high';
    if (eventType.includes('login') || eventType.includes('logout')) return 'medium';
    return 'low';
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Security Audit Log</CardTitle>
          <CardDescription>Loading security events...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Security Audit Log
        </CardTitle>
        <CardDescription>
          Recent security events for your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <p className="text-gray-500">No security events recorded</p>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-3 border rounded-lg">
                {getEventIcon(event.event_type)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{event.event_type}</span>
                    <Badge 
                      variant={
                        getEventSeverity(event.event_type) === 'high' 
                          ? 'destructive' 
                          : getEventSeverity(event.event_type) === 'medium'
                          ? 'default'
                          : 'secondary'
                      }
                    >
                      {getEventSeverity(event.event_type)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                  <div className="text-xs text-gray-500">
                    {new Date(event.created_at).toLocaleString()}
                  </div>
                  {event.event_data && Object.keys(event.event_data).length > 0 && (
                    <details className="mt-2">
                      <summary className="text-xs cursor-pointer text-blue-600">
                        View details
                      </summary>
                      <pre className="text-xs mt-1 p-2 bg-gray-50 rounded overflow-x-auto">
                        {JSON.stringify(event.event_data, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              onClick={loadSecurityEvents}
              className="w-full"
            >
              Refresh
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SecurityAuditLog;
