
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Plus, Download, Edit, BarChart3, Settings } from "lucide-react";
import BusinessImportForm from "@/components/BusinessImportForm";
import BusinessList from "@/components/BusinessList";
import BusinessEditForm from "./BusinessEditForm";

const AdminBusinessManagement = () => {
  const [activeSubTab, setActiveSubTab] = useState("list");
  const [editingBusiness, setEditingBusiness] = useState(null);

  const downloadTemplate = () => {
    const csvContent = [
      "name,description,address,city,state,zip_code,phone,email,website,services,rating,review_count,license_number,insurance_verified",
      "Cool Breeze AC Repair,Professional AC repair services,123 Main St,Miami,FL,33139,(305) 555-0123,info@coolbreeze.com,https://coolbreeze.com,\"AC Repair,Installation,Maintenance\",4.8,127,FL-12345,true",
      "Florida Comfort Solutions,HVAC services for Central Florida,456 Colonial Dr,Orlando,FL,32804,(407) 555-0456,contact@flcomfort.com,https://flcomfort.com,\"HVAC Repair,Duct Cleaning,Energy Audits\",4.6,89,FL-67890,true"
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'business_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleBusinessSaved = () => {
    setEditingBusiness(null);
    setActiveSubTab("list");
  };

  if (editingBusiness) {
    return (
      <BusinessEditForm
        business={editingBusiness}
        onSave={handleBusinessSaved}
        onCancel={() => setEditingBusiness(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Sub-tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <Button
          variant={activeSubTab === "list" ? "default" : "ghost"}
          onClick={() => setActiveSubTab("list")}
          className="px-4"
        >
          <Settings className="w-4 h-4 mr-2" />
          Manage Businesses
        </Button>
        <Button
          variant={activeSubTab === "import" ? "default" : "ghost"}
          onClick={() => setActiveSubTab("import")}
          className="px-4"
        >
          <Upload className="w-4 h-4 mr-2" />
          Import CSV
        </Button>
        <Button
          variant={activeSubTab === "add" ? "default" : "ghost"}
          onClick={() => setActiveSubTab("add")}
          className="px-4"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Single
        </Button>
        <Button
          variant={activeSubTab === "analytics" ? "default" : "ghost"}
          onClick={() => setActiveSubTab("analytics")}
          className="px-4"
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          Analytics
        </Button>
      </div>

      {/* Content */}
      {activeSubTab === "list" && <BusinessList />}

      {activeSubTab === "import" && (
        <div className="space-y-4">
          <Button onClick={downloadTemplate} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download CSV Template
          </Button>
          <BusinessImportForm />
        </div>
      )}

      {activeSubTab === "add" && <BusinessImportForm singleMode />}

      {activeSubTab === "analytics" && (
        <div className="text-center py-8">
          <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Business Analytics</h3>
          <p className="text-gray-600">Detailed analytics coming soon...</p>
        </div>
      )}
    </div>
  );
};

export default AdminBusinessManagement;
