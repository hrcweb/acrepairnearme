
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, AlertCircle, CheckCircle, FileText, Info } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BusinessImportFormProps {
  singleMode?: boolean;
}

const BusinessImportForm = ({ singleMode = false }: BusinessImportFormProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [importResults, setImportResults] = useState<{ success: number; errors: string[] } | null>(null);
  const [fileInfo, setFileInfo] = useState<{ name: string; size: number; rows: number } | null>(null);
  
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

  // Define the exact database column names
  const validColumns = [
    'name', 'description', 'address', 'city', 'state', 'zip_code',
    'phone', 'email', 'website', 'services', 'rating', 'review_count',
    'license_number', 'insurance_verified', 'latitude', 'longitude',
    'business_hours', 'featured', 'category', 'type'
  ];

  const validateFile = async (file: File) => {
    console.log('Validating file:', file.name, 'Type:', file.type, 'Size:', file.size);
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      throw new Error('File size too large. Please keep files under 10MB.');
    }

    const fileName = file.name.toLowerCase();
    const validTypes = ['text/csv', 'application/csv', 'text/plain', ''];
    const isValidType = validTypes.includes(file.type) || fileName.endsWith('.csv');
    
    if (!isValidType) {
      throw new Error(`Invalid file type. Expected CSV file, got: ${file.type || 'unknown'}`);
    }

    // Read and validate CSV structure
    const text = await file.text();
    const lines = text.split('\n').filter(line => line.trim());
    
    if (lines.length < 2) {
      throw new Error('CSV file must contain at least a header row and one data row.');
    }

    const headers = parseCSVLine(lines[0]).map(h => h.trim().toLowerCase().replace(/"/g, ''));
    const requiredFields = ['name', 'address', 'city', 'state', 'zip_code'];
    const mappedHeaders = headers.map(h => mapHeaderToDbColumn(h));
    
    const missingRequired = requiredFields.filter(field => 
      !mappedHeaders.includes(field) && !mappedHeaders.includes(mapHeaderToDbColumn(field))
    );

    if (missingRequired.length > 0) {
      throw new Error(`Missing required columns: ${missingRequired.join(', ')}. Please ensure your CSV has these columns.`);
    }

    setFileInfo({
      name: file.name,
      size: file.size,
      rows: lines.length - 1
    });

    return { text, lines, headers };
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setImportResults(null);
    setFileInfo(null);

    try {
      const { text, lines, headers } = await validateFile(file);
      
      console.log("Processing file with headers:", headers);
      const dataRows = lines.slice(1);
      const businesses = [];
      const errors = [];

      for (let i = 0; i < dataRows.length; i++) {
        try {
          const values = parseCSVLine(dataRows[i]);
          
          if (values.length === 0 || values.every(v => !v.trim())) {
            console.log(`Skipping empty row ${i + 2}`);
            continue;
          }

          const business: any = {};
          
          // Map headers to values with proper field mapping
          headers.forEach((header, index) => {
            let value = values[index]?.trim().replace(/^"|"$/g, '') || '';
            let dbField = mapHeaderToDbColumn(header);
            
            // Handle special field mappings
            if (dbField === 'street') {
              dbField = 'address';
            }
            
            if (!validColumns.includes(dbField)) {
              return; // Skip unknown columns
            }
            
            // Process the value based on the database field type
            switch (dbField) {
              case 'services':
                business[dbField] = value ? value.split(',').map(s => s.trim()).filter(s => s) : null;
                break;
              case 'rating':
                business[dbField] = value ? Math.min(5, Math.max(0, parseFloat(value) || 0)) : null;
                break;
              case 'review_count':
                business[dbField] = value ? Math.max(0, parseInt(value) || 0) : 0;
                break;
              case 'insurance_verified':
              case 'featured':
                business[dbField] = value ? (value.toLowerCase() === 'true' || value === '1' || value.toLowerCase() === 'yes') : false;
                break;
              case 'latitude':
              case 'longitude':
                const numValue = parseFloat(value);
                business[dbField] = (!isNaN(numValue) && isFinite(numValue)) ? numValue : null;
                break;
              case 'business_hours':
                try {
                  business[dbField] = value ? JSON.parse(value) : null;
                } catch {
                  business[dbField] = null;
                }
                break;
              default:
                business[dbField] = value || null;
            }
          });

          // Validate required fields
          const requiredFields = ['name', 'address', 'city', 'state', 'zip_code'];
          const missingFields = requiredFields.filter(field => !business[field] || business[field].trim() === '');
          
          if (missingFields.length > 0) {
            errors.push(`Row ${i + 2}: Missing required fields: ${missingFields.join(', ')}`);
            continue;
          }

          // Additional validation
          if (business.email && !isValidEmail(business.email)) {
            errors.push(`Row ${i + 2}: Invalid email format: ${business.email}`);
          }

          if (business.rating && (business.rating < 0 || business.rating > 5)) {
            errors.push(`Row ${i + 2}: Rating must be between 0 and 5`);
          }

          businesses.push(business);
        } catch (error) {
          errors.push(`Row ${i + 2}: ${error instanceof Error ? error.message : 'Parse error'}`);
        }
      }

      console.log(`Processed ${businesses.length} valid businesses out of ${dataRows.length} rows`);

      if (businesses.length > 0) {
        // Batch insert for better performance
        const batchSize = 50;
        let successCount = 0;

        for (let i = 0; i < businesses.length; i += batchSize) {
          const batch = businesses.slice(i, i + batchSize);
          
          try {
            const { error } = await supabase
              .from('businesses')
              .insert(batch);

            if (error) {
              console.error('Batch insert error:', error);
              errors.push(`Batch ${Math.floor(i / batchSize) + 1}: ${error.message}`);
            } else {
              successCount += batch.length;
            }
          } catch (insertError) {
            console.error('Insert error:', insertError);
            errors.push(`Batch ${Math.floor(i / batchSize) + 1}: ${insertError instanceof Error ? insertError.message : 'Unknown error'}`);
          }
        }

        setImportResults({ success: successCount, errors });
        
        if (successCount > 0) {
          toast({
            title: "Import completed",
            description: `Successfully imported ${successCount} businesses${errors.length > 0 ? ` with ${errors.length} errors` : ''}.`,
          });
        } else {
          toast({
            title: "Import failed",
            description: "No businesses were successfully imported. Check the errors below.",
            variant: "destructive",
          });
        }
      } else {
        setImportResults({ success: 0, errors });
        toast({
          title: "No valid businesses found",
          description: "Please check your CSV format and required fields.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Import error:', error);
      toast({
        title: "Import failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      setImportResults({ success: 0, errors: [error instanceof Error ? error.message : "Unknown error"] });
    } finally {
      setIsUploading(false);
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const mapHeaderToDbColumn = (header: string): string => {
    const headerMap: { [key: string]: string } = {
      'business_name': 'name',
      'company_name': 'name',
      'business name': 'name',
      'company name': 'name',
      'postal_code': 'zip_code',
      'zipcode': 'zip_code',
      'zip': 'zip_code',
      'zip code': 'zip_code',
      'phone_1': 'phone',
      'phone_number': 'phone',
      'telephone': 'phone',
      'phone number': 'phone',
      'email_1': 'email',
      'email_address': 'email',
      'email address': 'email',
      'website_url': 'website',
      'url': 'website',
      'website url': 'website',
      'reviews': 'review_count',
      'total_reviews': 'review_count',
      'review count': 'review_count',
      'total reviews': 'review_count',
      'num_reviews': 'review_count',
      'license': 'license_number',
      'license num': 'license_number',
      'license #': 'license_number',
      'insured': 'insurance_verified',
      'insurance': 'insurance_verified',
      'verified': 'insurance_verified',
      'street': 'address',
      'address_line_1': 'address',
      'address1': 'address'
    };

    return headerMap[header] || header.replace(/\s+/g, '_');
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
          current += '"';
          i += 2;
        } else {
          inQuotes = !inQuotes;
          i++;
        }
      } else if ((char === ',' || char === '\t') && !inQuotes) {
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
      // Validate required fields
      const requiredFields = ['name', 'address', 'city', 'state', 'zip_code'];
      const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
      
      if (missingFields.length > 0) {
        toast({
          title: "Missing required fields",
          description: `Please fill in: ${missingFields.join(', ')}`,
          variant: "destructive",
        });
        return;
      }

      // Validate email format if provided
      if (formData.email && !isValidEmail(formData.email)) {
        toast({
          title: "Invalid email format",
          description: "Please enter a valid email address",
          variant: "destructive",
        });
        return;
      }

      const businessData = {
        ...formData,
        services: formData.services ? formData.services.split(',').map(s => s.trim()).filter(s => s) : null,
        rating: formData.rating ? Math.min(5, Math.max(0, parseFloat(formData.rating) || 0)) : null,
        review_count: formData.review_count ? Math.max(0, parseInt(formData.review_count) || 0) : 0,
      };

      const { error } = await supabase
        .from('businesses')
        .insert([businessData]);

      if (error) {
        console.error('Single business insert error:', error);
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
        // Reset form
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
      console.error('Single business submit error:', error);
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
          <p className="text-sm text-gray-500 mt-1">Click to select a CSV file or drag and drop (Max 10MB)</p>
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

      {/* File Info */}
      {fileInfo && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">{fileInfo.name}</p>
                <p className="text-sm text-blue-700">
                  {(fileInfo.size / 1024).toFixed(1)} KB • {fileInfo.rows} data rows
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* CSV Format Help */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start space-x-2">
          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-2">CSV Import Guide:</h4>
            <p className="text-sm text-blue-800 mb-2">
              <strong>Required fields:</strong> name, address, city, state, zip_code
            </p>
            <p className="text-sm text-blue-800 mb-2">
              <strong>Optional fields:</strong> phone, email, website, services, rating, review_count, license_number, insurance_verified, latitude, longitude, business_hours, featured
            </p>
            <p className="text-sm text-blue-800">
              <strong>Auto-mapped headers:</strong> business_name→name, postal_code→zip_code, phone_1→phone, email_1→email, reviews→review_count
            </p>
          </div>
        </div>
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
