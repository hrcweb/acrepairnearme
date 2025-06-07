
import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import EmergencyServiceLocator from "@/components/EmergencyServiceLocator";

const Emergency = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-blue-600 hover:underline">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Emergency AC Service</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <EmergencyServiceLocator />
      </div>
    </div>
  );
};

export default Emergency;
