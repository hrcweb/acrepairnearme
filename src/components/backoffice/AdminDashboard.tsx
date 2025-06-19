
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Building2, Users, MessageSquare, FileText, Settings, BarChart3, Database, Globe } from "lucide-react";
import AdminBusinessManagement from "./AdminBusinessManagement";
import AdminUserManagement from "./AdminUserManagement";
import AdminReviewManagement from "./AdminReviewManagement";
import AdminAnalytics from "./AdminAnalytics";
import AdminSystemSettings from "./AdminSystemSettings";
import AdminContentManager from "./AdminContentManager";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("businesses");

  const tabs = [
    { id: "businesses", label: "Manage Businesses", icon: Building2, description: "Add, edit, and manage all business listings" },
    { id: "users", label: "Manage Users", icon: Users, description: "View and manage user accounts" },
    { id: "reviews", label: "Manage Reviews", icon: MessageSquare, description: "Moderate and manage reviews" },
    { id: "content", label: "Content Manager", icon: FileText, description: "Manage site content and pages" },
    { id: "analytics", label: "Analytics", icon: BarChart3, description: "View platform statistics and insights" },
    { id: "settings", label: "System Settings", icon: Settings, description: "Configure system settings and maintenance" },
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
      <div className="flex flex-wrap gap-1 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            onClick={() => setActiveTab(tab.id)}
            className="px-3 sm:px-6 py-2 text-sm"
          >
            <tab.icon className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
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

        {activeTab === "content" && (
          <Card>
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
              <CardDescription>
                Manage site content, pages, FAQs, and announcements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminContentManager />
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

        {activeTab === "settings" && (
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>
                Configure system settings, maintenance, and database operations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminSystemSettings />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
