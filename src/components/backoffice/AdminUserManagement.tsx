
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Search, Shield, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  user_roles?: Array<{ role: string }>;
}

const AdminUserManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          user_roles (role)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error loading users:', error);
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const grantAdminRole = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role: 'admin' });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Admin role granted successfully",
      });
      
      loadUsers(); // Reload to show updated roles
    } catch (error) {
      console.error('Error granting admin role:', error);
      toast({
        title: "Error",
        description: "Failed to grant admin role",
        variant: "destructive",
      });
    }
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.full_name && user.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const isAdmin = (user: UserProfile) => {
    return user.user_roles?.some(role => role.role === 'admin') || false;
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="h-4 w-4" />
          {filteredUsers.length} users
        </div>
      </div>

      {/* Users List */}
      <div className="grid gap-4">
        {filteredUsers.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 rounded-full p-2">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{user.full_name || user.email}</CardTitle>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isAdmin(user) ? (
                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                      <Shield className="h-3 w-3 mr-1" />
                      Admin
                    </Badge>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">User</Badge>
                      <Button
                        onClick={() => grantAdminRole(user.id)}
                        variant="outline"
                        size="sm"
                      >
                        <Shield className="h-3 w-3 mr-1" />
                        Make Admin
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-500">
                Joined: {new Date(user.created_at).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No users found.</p>
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement;
