
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SystemStats {
  totalBusinesses: number;
  totalUsers: number;
  totalReviews: number;
  pendingApprovals: number;
}

export const useSystemStats = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState<SystemStats>({
    totalBusinesses: 0,
    totalUsers: 0,
    totalReviews: 0,
    pendingApprovals: 0
  });

  const loadStats = async () => {
    try {
      console.log('Loading database statistics...');
      
      const [businessesResult, usersResult, reviewsResult] = await Promise.allSettled([
        supabase.from('businesses').select('id', { count: 'exact', head: true }),
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('reviews').select('id', { count: 'exact', head: true })
      ]);

      const businessCount = businessesResult.status === 'fulfilled' ? businessesResult.value.count || 0 : 0;
      const userCount = usersResult.status === 'fulfilled' ? usersResult.value.count || 0 : 0;
      const reviewCount = reviewsResult.status === 'fulfilled' ? reviewsResult.value.count || 0 : 0;

      setStats({
        totalBusinesses: businessCount,
        totalUsers: userCount,
        totalReviews: reviewCount,
        pendingApprovals: 0
      });

      console.log('Database statistics loaded:', { businessCount, userCount, reviewCount });
    } catch (error) {
      console.error('Error loading database stats:', error);
      toast({
        title: "Error loading statistics",
        description: "Could not load database statistics. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return { stats, loadStats };
};
