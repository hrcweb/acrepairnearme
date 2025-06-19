
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database } from "lucide-react";

interface DatabaseMaintenanceCardProps {
  onMaintenance: (action: string) => void;
  loading: boolean;
}

const DatabaseMaintenanceCard = ({ onMaintenance, loading }: DatabaseMaintenanceCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Database Management
        </CardTitle>
        <CardDescription>
          Perform database maintenance and optimization tasks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            onClick={() => onMaintenance('vacuum')}
            disabled={loading}
          >
            Vacuum Database
          </Button>
          <Button
            variant="outline"
            onClick={() => onMaintenance('reindex')}
            disabled={loading}
          >
            Reindex Tables
          </Button>
          <Button
            variant="outline"
            onClick={() => onMaintenance('analyze')}
            disabled={loading}
          >
            Analyze Statistics
          </Button>
        </div>
        
        <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Warning:</strong> Database maintenance operations can temporarily affect performance. 
            It's recommended to perform these during low-traffic periods.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DatabaseMaintenanceCard;
