
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, X, Eye, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface BusinessPhoto {
  id: string;
  url: string;
  caption: string;
  isPrimary: boolean;
}

interface BusinessPhotosManagerProps {
  businessId: number;
  subscriptionTier: string;
}

const BusinessPhotosManager = ({ businessId, subscriptionTier }: BusinessPhotosManagerProps) => {
  const { toast } = useToast();
  const [photos, setPhotos] = useState<BusinessPhoto[]>([]);
  const [uploading, setUploading] = useState(false);

  const maxPhotos = {
    free: 0,
    basic: 5,
    premium: 15,
    enterprise: 50
  };

  const handleFileUpload = async (files: FileList) => {
    if (photos.length >= maxPhotos[subscriptionTier as keyof typeof maxPhotos]) {
      toast({
        title: "Upload limit reached",
        description: `Your ${subscriptionTier} plan allows up to ${maxPhotos[subscriptionTier as keyof typeof maxPhotos]} photos.`,
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newPhotos = Array.from(files).map((file, index) => ({
      id: `photo-${Date.now()}-${index}`,
      url: URL.createObjectURL(file),
      caption: file.name,
      isPrimary: photos.length === 0 && index === 0
    }));

    setPhotos(prev => [...prev, ...newPhotos]);
    setUploading(false);
    
    toast({
      title: "Photos uploaded successfully",
      description: `${newPhotos.length} photo(s) added to your gallery.`,
    });
  };

  const removePhoto = (photoId: string) => {
    setPhotos(prev => prev.filter(p => p.id !== photoId));
  };

  const setPrimaryPhoto = (photoId: string) => {
    setPhotos(prev => prev.map(p => ({ ...p, isPrimary: p.id === photoId })));
  };

  if (subscriptionTier === 'free') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Business Photos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">Photo uploads not available on Free plan</p>
            <Button variant="outline">Upgrade Plan</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Business Photos
          <Badge variant="outline">
            {photos.length}/{maxPhotos[subscriptionTier as keyof typeof maxPhotos]} photos
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 mb-2">Upload business photos</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                className="hidden"
                id="photo-upload"
                disabled={uploading || photos.length >= maxPhotos[subscriptionTier as keyof typeof maxPhotos]}
              />
              <Button 
                asChild 
                variant="outline"
                disabled={uploading || photos.length >= maxPhotos[subscriptionTier as keyof typeof maxPhotos]}
              >
                <label htmlFor="photo-upload">
                  {uploading ? 'Uploading...' : 'Choose Files'}
                </label>
              </Button>
            </div>
          </div>

          {/* Photo Grid */}
          {photos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={photo.url} 
                      alt={photo.caption}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {photo.isPrimary && (
                    <Badge className="absolute top-2 left-2">
                      <Star className="w-3 h-3 mr-1" />
                      Primary
                    </Badge>
                  )}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-1">
                      {!photo.isPrimary && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setPrimaryPhoto(photo.id)}
                        >
                          <Star className="w-3 h-3" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removePhoto(photo.id)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessPhotosManager;
