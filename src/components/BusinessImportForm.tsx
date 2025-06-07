
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Upload, AlertCircle, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BusinessImportFormProps {
  singleMode?: boolean;
}

const BusinessImportForm = ({ singleMode = false }: BusinessImportFormProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [importResults, setImportResults] = useState<{ success: number; errors: string[] } | null>(null);
  
  // Single business form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    state: "FL",
    zip_code: "",
    phone: "",
    email: "",
    website: "",
    services: "",
    rating: "",
    review_count: "",
    license_number: "",
    insurance_verified: false
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'text/csv') {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    const text = await file.text();
    
    try {
      const lines = text.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      const dataRows = lines.slice(1);
      
      const businesses = [];
      const errors = [];

      for (let i = 0; i < dataRows.length; i++) {
        try {
          const values = parseCSVLine(dataRows[i]);
          if (values.length < headers.length) continue;

          const business: any = {};
          headers.forEach((header, index) => {
            let value = values[index]?.trim().replace(/"/g, '') || null;
            
            switch (header) {
              case 'services':
                business[header] = value ? value.split(',').map(s => s.trim()) : [];
                break;
              case 'rating':
                business[header] = value ? parseFloat(value) : 0.0;
                break;
              case 'review_count':
                business[header] = value ? parseInt(value) : 0;
                break;
              case 'insurance_verified':
                business[header] = value === 'true' || value === '1';
                break;
              case 'latitude':
              case 'longitude':
                business[header] = value ? parseFloat(value) : null;
                break;
              default:
                business[header] = value;
            }
          });

          // Validate required fields
          if (!business.name || !business.address || !business.city || !business.state || !business.zip_code) {
            errors.push(`Row ${i + 2}: Missing required fields (name, address, city, state, zip_code)`);
            continue;
          }

          businesses.push(business);
        } catch (error) {
          errors.push(`Row ${i + 2}: ${error instanceof Error ? error.message : 'Parse error'}`);
        }
      }

      if (businesses.length > 0) {
        const { error } = await supabase
          .from('businesses')
          .insert(businesses);

        if (error) {
          toast({
            title: "Import failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          setImportResults({ success: businesses.length, errors });
          toast({
            title: "Import successful",
            description: `Successfully imported ${businesses.length} businesses.`,
          });
        }
      } else {
        toast({
          title: "No valid businesses found",
          description: "Please check your CSV format and try again.",
          variant: "destructive",
        });
      }

      setImportResults({ success: businesses.length, errors });
    } catch (error) {
      toast({
        title: "Import failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const parseCSVLine = (line: string): string[] => {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    return result;
  };

  const handleSingleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const businessData = {
        ...formData,
        services: formData.services ? formData.services.split(',').map(s => s.trim()) : [],
        rating: formData.rating ? parseFloat(formData.rating) : 0.0,
        review_count: formData.review_count ? parseInt(formData.review_count) : 0,
      };

      const { error } = await supabase
        .from('businesses')
        .insert([businessData]);

      if (error) {
        toast({
          title: "Error adding business",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Business added successfully",
          description: `${formData.name} has been added to the database.`,
        });
        setFormData({
          name: "",
          description: "",
          address: "",
          city: "",
          state: "FL",
          zip_code: "",
          phone: "",
          email: "",
          website: "",
          services: "",
          rating: "",
          review_count: "",
          license_number: "",
          insurance_verified: false
        });
      }
    } catch (error) {
      toast({
        title: "Error adding business",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (singleMode) {
    return (
      <form onSubmit={handleSingleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Business Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="address">Address *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="state">State *</Label>
            <Select value={formData.state} onValueChange={(value) => setFormData({ ...formData, state: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FL">Florida</SelectItem>
                <SelectItem value="GA">Georgia</SelectItem>
                <SelectItem value="AL">Alabama</SelectItem>
                <SelectItem value="SC">South Carolina</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="zip_code">Zip Code *</Label>
            <Input
              id="zip_code"
              value={formData.zip_code}
              onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="services">Services (comma separated)</Label>
            <Input
              id="services"
              value={formData.services}
              onChange={(e) => setFormData({ ...formData, services: e.target.value })}
              placeholder="AC Repair, Installation, Maintenance"
            />
          </div>
          <div>
            <Label htmlFor="rating">Rating (0-5)</Label>
            <Input
              id="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="review_count">Review Count</Label>
            <Input
              id="review_count"
              type="number"
              min="0"
              value={formData.review_count}
              onChange={(e) => setFormData({ ...formData, review_count: e.target.value })}
            />
          </div>
        </div>
        <Button type="submit" disabled={isUploading} className="w-full">
          {isUploading ? "Adding..." : "Add Business"}
        </Button>
      </form>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <Label htmlFor="csv-upload" className="cursor-pointer">
          <span className="text-lg font-medium">Upload CSV File</span>
          <p className="text-sm text-gray-500 mt-1">Click to select a CSV file or drag and drop</p>
        </Label>
        <Input
          id="csv-upload"
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          disabled={isUploading}
          className="hidden"
        />
      </div>

      {importResults && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium">Import completed: {importResults.success} businesses added</span>
            </div>
            
            {importResults.errors.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span className="font-medium text-red-700">Errors ({importResults.errors.length}):</span>
                </div>
                <div className="bg-red-50 p-3 rounded-md max-h-32 overflow-y-auto">
                  {importResults.errors.map((error, index) => (
                    <p key={index} className="text-sm text-red-700">{error}</p>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BusinessImportForm;
