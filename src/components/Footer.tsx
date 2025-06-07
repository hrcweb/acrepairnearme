
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AC</span>
              </div>
              <span className="text-xl font-bold">AC Repair Near Me</span>
            </div>
            <p className="text-gray-300 mb-4">
              Florida's trusted directory for professional AC repair, installation, and maintenance services. 
              Connecting homeowners with verified, licensed contractors since 2020.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/list-business" className="hover:text-white transition-colors">List Your Business</Link></li>
              <li><Link to="/emergency" className="hover:text-white transition-colors">Emergency Service</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/contact-support" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/contractor-guidelines" className="hover:text-white transition-colors">Contractor Guidelines</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© 2025 AC Repair Near Me. All rights reserved worldwide.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
