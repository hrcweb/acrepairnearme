
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BusinessPrioritySupportProps {
  subscriptionTier: string;
}

const BusinessPrioritySupport = ({ subscriptionTier }: BusinessPrioritySupportProps) => {
  const { toast } = useToast();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const supportLevels = {
    free: { available: false, responseTime: "N/A" },
    basic: { available: true, responseTime: "48 hours" },
    premium: { available: true, responseTime: "24 hours" },
    enterprise: { available: true, responseTime: "2 hours" }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate ticket submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Support ticket submitted",
      description: `We'll respond within ${supportLevels[subscriptionTier as keyof typeof supportLevels].responseTime}.`,
    });
    
    setSubject("");
    setMessage("");
    setSubmitting(false);
  };

  const currentLevel = supportLevels[subscriptionTier as keyof typeof supportLevels];

  if (!currentLevel.available) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Priority Support</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">Priority support not available on Free plan</p>
            <Button variant="outline">Upgrade for Support Access</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Priority Support
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {currentLevel.responseTime} response
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief description of your issue"
                required
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Provide details about your issue or question..."
                rows={6}
                required
              />
            </div>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Support Ticket'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Recent Tickets */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Support Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">Business listing update</div>
                <div className="text-sm text-gray-500">Submitted 2 days ago</div>
              </div>
              <Badge variant="outline" className="text-green-600">
                <CheckCircle className="w-3 h-3 mr-1" />
                Resolved
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">Photo upload issue</div>
                <div className="text-sm text-gray-500">Submitted 5 days ago</div>
              </div>
              <Badge variant="outline" className="text-green-600">
                <CheckCircle className="w-3 h-3 mr-1" />
                Resolved
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessPrioritySupport;
