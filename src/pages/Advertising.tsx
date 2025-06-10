
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import AdvertisingOptions from "@/components/AdvertisingOptions";
import SponsorshipForm from "@/components/SponsorshipForm";
import BannerAdvertisementForm from "@/components/BannerAdvertisementForm";

type ViewState = 'options' | 'sponsorship' | 'banner';

const Advertising = () => {
  const [currentView, setCurrentView] = useState<ViewState>('options');

  const renderContent = () => {
    switch (currentView) {
      case 'sponsorship':
        return <SponsorshipForm onBack={() => setCurrentView('options')} />;
      case 'banner':
        return <BannerAdvertisementForm onBack={() => setCurrentView('options')} />;
      default:
        return (
          <AdvertisingOptions
            onSelectSponsorship={() => setCurrentView('sponsorship')}
            onSelectBanner={() => setCurrentView('banner')}
          />
        );
    }
  };

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
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AC</span>
              </div>
              <span className="text-xl font-bold text-gray-900">AC Repair Near Me</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      
      <Footer />
    </div>
  );
};

export default Advertising;
