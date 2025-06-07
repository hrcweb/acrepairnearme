
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GallerySectionProps {
  gallery: string[];
  businessName: string;
}

const GallerySection = ({ gallery, businessName }: GallerySectionProps) => {
  if (gallery.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gallery</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {gallery.map((image, index) => (
            <img 
              key={index}
              src={image} 
              alt={`${businessName} work ${index + 1}`}
              className="w-full h-24 object-cover rounded-lg bg-gray-200"
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GallerySection;
