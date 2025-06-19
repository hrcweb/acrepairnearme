
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Database, Shield, Mail, Zap } from "lucide-react";

interface SystemStatsProps {
  stats: {
    totalBusinesses: number;
    totalUsers: number;
    totalReviews: number;
    pendingApprovals: number;
  };
}

const SystemStats = ({ stats }: SystemStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">{stats.totalBusinesses}</p>
              <p className="text-sm text-muted-foreground">Total Businesses</p>
            </div>
            <Database className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </div>
            <Shield className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">{stats.totalReviews}</p>
              <p className="text-sm text-muted-foreground">Total Reviews</p>
            </div>
            <Mail className="h-8 w-8 text-orange-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">{stats.pendingApprovals}</p>
              <p className="text-sm text-muted-foreground">Pending Approvals</p>
            </div>
            <Zap className="h-8 w-8 text-red-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemStats;
