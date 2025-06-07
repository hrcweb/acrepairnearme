
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Building2, Users, MessageSquare, FileText, Settings, BarChart3 } from "lucide-react";
import AdminBusinessManagement from "./AdminBusinessManagement";
import AdminUserManagement from "./AdminUserManagement";
import AdminReviewManagement from "./AdminReviewManagement";
import AdminAnalytics from "./AdminAnalytics";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("businesses");

  const tabs = [
    { id: "businesses", label: "Manage Businesses", icon: Building2, description: "Add, edit, and manage all business listings" },
    { id: "users", label: "Manage Users", icon: Users, description: "View and manage user accounts" },
    { id: "reviews", label: "Manage Reviews", icon: MessageSquare, description: "Moderate and manage reviews" },
    { id: "analytics", label: "Analytics", icon: BarChart3, description: "View platform statistics and insights" },
  ];

  return (
    <div className="space-y-6">
      {/* Admin Welcome Section */}
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <Shield className="h-5 w-5" />
            Administrator Dashboard
          </CardTitle>
          <CardDescription className="text-red-700">
            You have full administrative access to manage all aspects of the platform.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            onClick={() => setActiveTab(tab.id)}
            className="px-6"
          >
            <tab.icon className="w-4 h-4 mr-2" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === "businesses" && (
          <Card>
            <CardHeader>
              <CardTitle>Business Management</CardTitle>
              <CardDescription>
                Manage all business listings, add new businesses, and handle imports.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminBusinessManagement />
            </CardContent>
          </Card>
        )}

        {activeTab === "users" && (
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                View and manage user accounts and permissions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminUserManagement />
            </CardContent>
          </Card>
        )}

        {activeTab === "reviews" && (
          <Card>
            <CardHeader>
              <CardTitle>Review Management</CardTitle>
              <CardDescription>
                Moderate reviews and manage review-related content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminReviewManagement />
            </CardContent>
          </Card>
        )}

        {activeTab === "analytics" && (
          <Card>
            <CardHeader>
              <CardTitle>Platform Analytics</CardTitle>
              <CardDescription>
                View insights and statistics about platform usage.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminAnalytics />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
