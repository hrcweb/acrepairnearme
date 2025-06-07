
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
    <div className="md:hidden">
      {/* Mobile Menu Button */}
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={toggleMenu}
        className="p-2"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={toggleMenu}>
          <div 
            className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">AC</span>
                  </div>
                  <span className="font-bold text-gray-900">AC Repair Near Me</span>
                </div>
                <Button variant="ghost" size="sm" onClick={toggleMenu}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* User Section */}
              {user ? (
                <Card className="mb-6">
                  <CardContent className="p-4">
                    <p className="font-medium text-gray-900 mb-2">
                      Welcome back!
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      {user.email}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        signOut();
                        toggleMenu();
                      }}
                      className="w-full"
                    >
                      Sign Out
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="mb-6">
                  <CardContent className="p-4">
                    <p className="font-medium text-gray-900 mb-3">
                      Sign in to access more features
                    </p>
                    <Button 
                      size="sm" 
                      className="w-full"
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
              <nav className="space-y-2">
                {menuItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={toggleMenu}
                  >
                    <item.icon className="w-5 h-5 text-gray-500" />
                    <span className="font-medium text-gray-900">{item.label}</span>
                  </a>
                ))}
              </nav>

              {/* Quick Actions */}
              <div className="mt-8 space-y-3">
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <Phone className="w-4 h-4 mr-2" />
                  Emergency Service
                </Button>
                <Button variant="outline" className="w-full">
                  Get Free Quote
                </Button>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t text-center">
                <p className="text-xs text-gray-500">
                  © 2024 AC Repair Near Me
                </p>
                <div className="flex justify-center space-x-4 mt-2">
                  <a href="#" className="text-xs text-gray-500 hover:text-blue-600">
                    Privacy
                  </a>
                  <a href="#" className="text-xs text-gray-500 hover:text-blue-600">
                    Terms
                  </a>
                  <a href="/faq" className="text-xs text-gray-500 hover:text-blue-600">
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
