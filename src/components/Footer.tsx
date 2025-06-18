
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AC</span>
              </div>
              <span className="text-lg sm:text-xl font-bold">AC Repair Near Me</span>
            </div>
            <p className="text-gray-300 mb-4 text-sm sm:text-base leading-relaxed">
              Florida's trusted directory for professional AC repair, installation, and maintenance services. 
              Connecting homeowners with verified, licensed contractors since 2020.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-base sm:text-lg">Quick Links</h4>
            <ul className="space-y-3 text-gray-300 text-sm sm:text-base">
              <li>
                <Link to="/" className="hover:text-white transition-colors py-1 block min-h-[24px]">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors py-1 block min-h-[24px]">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/list-business" className="hover:text-white transition-colors py-1 block min-h-[24px]">
                  List Your Business
                </Link>
              </li>
              <li>
                <Link to="/emergency" className="hover:text-white transition-colors py-1 block min-h-[24px]">
                  Emergency Service
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors py-1 block min-h-[24px]">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-base sm:text-lg">Support</h4>
            <ul className="space-y-3 text-gray-300 text-sm sm:text-base">
              <li>
                <Link to="/contact-support" className="hover:text-white transition-colors py-1 block min-h-[24px]">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors py-1 block min-h-[24px]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="hover:text-white transition-colors py-1 block min-h-[24px]">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contractor-guidelines" className="hover:text-white transition-colors py-1 block min-h-[24px]">
                  Contractor Guidelines
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400">
          <p className="text-sm sm:text-base">© 2025 AC Repair Near Me. All rights reserved worldwide.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
