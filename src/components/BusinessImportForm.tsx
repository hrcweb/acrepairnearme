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
      if (lines.length === 0) {
        toast({
          title: "Empty file",
          description: "The CSV file appears to be empty.",
          variant: "destructive",
        });
        setIsUploading(false);
        return;
      }

      const headers = parseCSVLine(lines[0]).map(h => h.trim().toLowerCase().replace(/"/g, ''));
      console.log("Parsed headers:", headers);
      
      const dataRows = lines.slice(1);
      console.log(`Processing ${dataRows.length} data rows`);
      
      const businesses = [];
      const errors = [];

      for (let i = 0; i < dataRows.length; i++) {
        try {
          const values = parseCSVLine(dataRows[i]);
          console.log(`Row ${i + 2} values:`, values);
          
          if (values.length === 0 || values.every(v => !v.trim())) {
            console.log(`Skipping empty row ${i + 2}`);
            continue;
          }

          const business: any = {};
          
          // Map headers to values with improved field mapping
          headers.forEach((header, index) => {
            let value = values[index]?.trim().replace(/^"|"$/g, '') || '';
            
            // Enhanced mapping for common header variations
            let dbField = header;
            
            // Common field mappings
            if (header === 'business_name' || header === 'company_name') dbField = 'name';
            if (header === 'zip' || header === 'zipcode' || header === 'postal_code') dbField = 'zip_code';
            if (header === 'phone_number' || header === 'telephone' || header === 'phone_1') dbField = 'phone';
            if (header === 'email_address' || header === 'email_1') dbField = 'email';
            if (header === 'website_url' || header === 'url') dbField = 'website';
            if (header === 'reviews' || header === 'review_count' || header === 'total_reviews') dbField = 'review_count';
            
            switch (dbField) {
              case 'services':
                business[dbField] = value ? value.split(',').map(s => s.trim()).filter(s => s) : [];
                break;
              case 'rating':
                business[dbField] = value ? parseFloat(value) : 0.0;
                break;
              case 'review_count':
                business[dbField] = value ? parseInt(value) : 0;
                break;
              case 'insurance_verified':
                business[dbField] = value.toLowerCase() === 'true' || value === '1';
                break;
              case 'latitude':
              case 'longitude':
                business[dbField] = value ? parseFloat(value) : null;
                break;
              default:
                business[dbField] = value || null;
            }
          });

          console.log(`Row ${i + 2} business object:`, business);

          // Validate required fields
          const requiredFields = ['name', 'address', 'city', 'state', 'zip_code'];
          const missingFields = requiredFields.filter(field => !business[field] || business[field].trim() === '');
          
          if (missingFields.length > 0) {
            errors.push(`Row ${i + 2}: Missing required fields: ${missingFields.join(', ')}`);
            console.log(`Row ${i + 2} missing fields:`, missingFields);
            continue;
          }

          businesses.push(business);
        } catch (error) {
          const errorMsg = `Row ${i + 2}: ${error instanceof Error ? error.message : 'Parse error'}`;
          errors.push(errorMsg);
          console.error(errorMsg, error);
        }
      }

      console.log(`Processed ${businesses.length} valid businesses`);

      if (businesses.length > 0) {
        const { error } = await supabase
          .from('businesses')
          .insert(businesses);

        if (error) {
          console.error('Supabase insert error:', error);
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
      console.error('Import error:', error);
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
    let i = 0;
    
    while (i < line.length) {
      const char = line[i];
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          // Handle escaped quotes
          current += '"';
          i += 2;
        } else {
          // Toggle quote state
          inQuotes = !inQuotes;
          i++;
        }
      } else if ((char === ',' || char === '\t') && !inQuotes) {
        // Handle both comma and tab delimiters
        result.push(current);
        current = '';
        i++;
      } else {
        current += char;
        i++;
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

      {/* CSV Format Help */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">CSV Format Requirements:</h4>
        <p className="text-sm text-blue-800 mb-2">
          Your CSV should include these headers (the system will automatically map common variations):
        </p>
        <ul className="text-sm text-blue-800 list-disc list-inside space-y-1">
          <li><strong>Required:</strong> name, address, city, state, zip_code (or postal_code)</li>
          <li><strong>Optional:</strong> phone, email (or email_1), website, services, rating, reviews (or review_count)</li>
        </ul>
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
