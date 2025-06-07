
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCheck, MessageSquare, Building2, Settings, Plus } from "lucide-react";
import UserProfile from "./UserProfile";
import UserReviews from "./UserReviews";
import UserBusinesses from "./UserBusinesses";
import UserBusinessManagement from "./UserBusinessManagement";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("businesses");

  const tabs = [
    { id: "businesses", label: "My Businesses", icon: Building2, description: "Manage your business listings" },
    { id: "reviews", label: "My Reviews", icon: MessageSquare, description: "View your submitted reviews" },
    { id: "profile", label: "Profile", icon: Settings, description: "Update your account information" },
  ];

  return (
    <div className="space-y-6">
      {/* User Welcome Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <UserCheck className="h-5 w-5" />
            User Dashboard
          </CardTitle>
          <CardDescription className="text-blue-700">
            Manage your business listings, reviews, and profile information.
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
                Add, edit, and manage your business listings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserBusinessManagement />
            </CardContent>
          </Card>
        )}

        {activeTab === "reviews" && (
          <Card>
            <CardHeader>
              <CardTitle>My Reviews</CardTitle>
              <CardDescription>
                View and manage reviews you've submitted.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserReviews />
            </CardContent>
          </Card>
        )}

        {activeTab === "profile" && (
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Update your personal information and account settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserProfile />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
