
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, MessageSquare, User, BarChart3 } from "lucide-react";
import UserProfile from "./UserProfile";
import UserReviews from "./UserReviews";
import UserBusinesses from "./UserBusinesses";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "My Profile", icon: User, description: "Manage your account information" },
    { id: "businesses", label: "My Businesses", icon: FileText, description: "View and manage your business listings" },
    { id: "reviews", label: "My Reviews", icon: MessageSquare, description: "See reviews you've submitted" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            User Dashboard
          </CardTitle>
          <CardDescription>
            Welcome to your personal dashboard. Manage your profile, businesses, and reviews.
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
        {activeTab === "profile" && (
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and account settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserProfile />
            </CardContent>
          </Card>
        )}

        {activeTab === "businesses" && (
          <Card>
            <CardHeader>
              <CardTitle>My Business Listings</CardTitle>
              <CardDescription>
                Manage your business listings and information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserBusinesses />
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
      </div>
    </div>
  );
};

export default UserDashboard;
