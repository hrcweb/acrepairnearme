
import { useState } from "react";
import { Menu, X, Search, MapPin, Star, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { icon: Search, label: "Find Contractors", href: "#" },
    { icon: MapPin, label: "Service Areas", href: "#" },
    { icon: Star, label: "List Your Business", href: "/list-business" },
    { icon: Phone, label: "Emergency Service", href: "#" },
  ];

  return (
    <div className="lg:hidden">
      {/* Mobile Menu Button - Larger touch target */}
      <Button 
        variant="ghost" 
        size="lg" 
        onClick={toggleMenu}
        className="p-3 min-h-[44px] min-w-[44px]" // iOS recommended minimum touch target
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60" onClick={toggleMenu}>
          <div 
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 h-full overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-base">AC</span>
                  </div>
                  <span className="font-bold text-gray-900 text-lg">AC Repair Near Me</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="lg" 
                  onClick={toggleMenu}
                  className="p-3 min-h-[44px] min-w-[44px]"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              {/* User Section */}
              {user ? (
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <p className="font-medium text-gray-900 mb-3 text-lg">
                      Welcome back!
                    </p>
                    <p className="text-base text-gray-600 mb-4">
                      {user.email}
                    </p>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      onClick={() => {
                        signOut();
                        toggleMenu();
                      }}
                      className="w-full min-h-[48px] text-base"
                    >
                      Sign Out
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <p className="font-medium text-gray-900 mb-4 text-lg">
                      Sign in to access more features
                    </p>
                    <Button 
                      size="lg" 
                      className="w-full min-h-[48px] text-base"
                      onClick={() => {
                        window.location.href = '/auth';
                        toggleMenu();
                      }}
                    >
                      Sign In
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Navigation Items */}
              <nav className="space-y-3 mb-8">
                {menuItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-100 transition-colors min-h-[56px]"
                    onClick={toggleMenu}
                  >
                    <item.icon className="w-6 h-6 text-gray-500" />
                    <span className="font-medium text-gray-900 text-lg">{item.label}</span>
                  </a>
                ))}
              </nav>

              {/* Quick Actions */}
              <div className="space-y-4 mb-8">
                <Button className="w-full bg-red-600 hover:bg-red-700 min-h-[52px] text-base">
                  <Phone className="w-5 h-5 mr-3" />
                  Emergency Service
                </Button>
                <Button variant="outline" className="w-full min-h-[52px] text-base">
                  Get Free Quote
                </Button>
              </div>

              {/* Footer */}
              <div className="pt-6 border-t text-center">
                <p className="text-sm text-gray-500 mb-3">
                  © 2024 AC Repair Near Me
                </p>
                <div className="flex justify-center space-x-6">
                  <a href="#" className="text-sm text-gray-500 hover:text-blue-600 py-2">
                    Privacy
                  </a>
                  <a href="#" className="text-sm text-gray-500 hover:text-blue-600 py-2">
                    Terms
                  </a>
                  <a href="/faq" className="text-sm text-gray-500 hover:text-blue-600 py-2">
                    FAQ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNavigation;
