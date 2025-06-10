
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCheck, MessageSquare, Building2, Settings } from "lucide-react";
import UserProfile from "./UserProfile";
import UserReviews from "./UserReviews";
import EnhancedBusinessManagement from "./EnhancedBusinessManagement";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("businesses");

  const tabs = [
    { id: "businesses", label: "My Businesses", icon: Building2, description: "Manage your business listings with advanced features" },
    { id: "reviews", label: "My Reviews", icon: MessageSquare, description: "View your submitted reviews" },
    { id: "profile", label: "Profile", icon: Settings, description: "Update your account information" },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
      {/* User Welcome Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-blue-800 text-lg sm:text-xl">
            <UserCheck className="h-5 w-5 sm:h-6 sm:w-6" />
            User Dashboard
          </CardTitle>
          <CardDescription className="text-blue-700 text-sm sm:text-base">
            Manage your business listings with advanced features including photos, analytics, priority support, and more based on your subscription plan.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Tab Navigation - Mobile optimized */}
      <div className="overflow-x-auto">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg min-w-fit">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.id)}
              className="px-3 sm:px-6 py-3 text-sm sm:text-base min-h-[44px] whitespace-nowrap"
            >
              <tab.icon className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">{tab.label}</span>
              <span className="xs:hidden">{tab.label.split(' ')[0]}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-4 sm:space-y-6">
        {activeTab === "businesses" && (
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Enhanced Business Management</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Access all business features based on your subscription plan: Basic (5 photos, analytics), Premium (15 photos, advanced metrics), Enterprise (50 photos, custom domain, priority support).
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <EnhancedBusinessManagement />
            </CardContent>
          </Card>
        )}

        {activeTab === "reviews" && (
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">My Reviews</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                View and manage reviews you've submitted.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <UserReviews />
            </CardContent>
          </Card>
        )}

        {activeTab === "profile" && (
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Profile Settings</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Update your personal information and account settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <UserProfile />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
