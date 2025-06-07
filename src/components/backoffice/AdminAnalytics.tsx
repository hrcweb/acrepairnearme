
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, MessageSquare, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Analytics {
  totalBusinesses: number;
  totalUsers: number;
  totalReviews: number;
  averageRating: number;
  recentBusinesses: number;
  recentUsers: number;
  recentReviews: number;
}

const AdminAnalytics = () => {
  const { toast } = useToast();
  const [analytics, setAnalytics] = useState<Analytics>({
    totalBusinesses: 0,
    totalUsers: 0,
    totalReviews: 0,
    averageRating: 0,
    recentBusinesses: 0,
    recentUsers: 0,
    recentReviews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      // Get total counts
      const [businessesResult, usersResult, reviewsResult] = await Promise.all([
        supabase.from('businesses').select('id', { count: 'exact' }),
        supabase.from('profiles').select('id', { count: 'exact' }),
        supabase.from('reviews').select('id, rating', { count: 'exact' })
      ]);

      // Get recent counts (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const [recentBusinessesResult, recentUsersResult, recentReviewsResult] = await Promise.all([
        supabase.from('businesses').select('id', { count: 'exact' }).gte('created_at', thirtyDaysAgo.toISOString()),
        supabase.from('profiles').select('id', { count: 'exact' }).gte('created_at', thirtyDaysAgo.toISOString()),
        supabase.from('reviews').select('id', { count: 'exact' }).gte('created_at', thirtyDaysAgo.toISOString())
      ]);

      // Calculate average rating
      const reviews = reviewsResult.data || [];
      const averageRating = reviews.length > 0 
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
        : 0;

      setAnalytics({
        totalBusinesses: businessesResult.count || 0,
        totalUsers: usersResult.count || 0,
        totalReviews: reviewsResult.count || 0,
        averageRating: Number(averageRating.toFixed(1)),
        recentBusinesses: recentBusinessesResult.count || 0,
        recentUsers: recentUsersResult.count || 0,
        recentReviews: recentReviewsResult.count || 0,
      });
    } catch (error) {
      console.error('Error loading analytics:', error);
      toast({
        title: "Error",
        description: "Failed to load analytics",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, recent, description }: {
    title: string;
    value: number;
    icon: any;
    recent?: number;
    description: string;
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">
          {recent !== undefined && `+${recent} in last 30 days`}
        </p>
        <CardDescription className="mt-1">{description}</CardDescription>
      </CardContent>
    </Card>
  );

  if (loading) {
    return <div>Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Businesses"
          value={analytics.totalBusinesses}
          icon={Building2}
          recent={analytics.recentBusinesses}
          description="Total business listings on the platform"
        />
        <StatCard
          title="Total Users"
          value={analytics.totalUsers}
          icon={Users}
          recent={analytics.recentUsers}
          description="Registered user accounts"
        />
        <StatCard
          title="Total Reviews"
          value={analytics.totalReviews}
          icon={MessageSquare}
          recent={analytics.recentReviews}
          description="Reviews submitted by users"
        />
        <StatCard
          title="Average Rating"
          value={analytics.averageRating}
          icon={Star}
          description="Platform-wide average rating"
        />
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity (Last 30 Days)</CardTitle>
          <CardDescription>Summary of platform activity over the past month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">New Businesses</span>
              <span className="text-2xl font-bold text-green-600">+{analytics.recentBusinesses}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">New Users</span>
              <span className="text-2xl font-bold text-blue-600">+{analytics.recentUsers}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">New Reviews</span>
              <span className="text-2xl font-bold text-purple-600">+{analytics.recentReviews}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
