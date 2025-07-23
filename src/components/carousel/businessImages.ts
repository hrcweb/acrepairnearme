
export const AC_IMAGES = [
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=250&fit=crop",
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=250&fit=crop",
  "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=250&fit=crop",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop",
  "https://images.unsplash.com/photo-1555963633-1bb0c20b54f5?w=400&h=250&fit=crop",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=250&fit=crop",
  "https://images.unsplash.com/photo-1551522435-a13afa10f103?w=400&h=250&fit=crop",
  "https://images.unsplash.com/photo-1592928302636-c83cf0fa1a2a?w=400&h=250&fit=crop",
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
  "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=250&fit=crop",
  "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=250&fit=crop",
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop"
];

export const getRandomAcImage = (businessId: number): string => {
  return AC_IMAGES[businessId % AC_IMAGES.length];
};
