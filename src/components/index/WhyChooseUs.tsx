
import React from "react";
import { Shield, Star, Clock, MapPin } from "lucide-react";

const WhyChooseUs = () => {
  return (
    <section className="mt-24 bg-gray-50 rounded-lg p-8">
      <h3 className="text-2xl font-bold mb-6 text-center">
        Why Choose Our AC Repair Directory?
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <Shield className="w-8 h-8 text-blue-500 mb-3" />
          <h4 className="font-semibold mb-2">Licensed & Verified Contractors</h4>
          <p className="text-sm">All AC repair contractors are verified for proper licensing, insurance, and credentials.</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <Star className="w-8 h-8 text-orange-500 mb-3" />
          <h4 className="font-semibold mb-2">Commercial AC Repair Specialists</h4>
          <p className="text-sm">Find contractors specializing in commercial heating and air conditioning repair for businesses.</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <Clock className="w-8 h-8 text-green-500 mb-3" />
          <h4 className="font-semibold mb-2">24/7 Emergency Service</h4>
          <p className="text-sm">Access emergency AC repair services available around the clock for urgent situations.</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <MapPin className="w-8 h-8 text-purple-500 mb-3" />
          <h4 className="font-semibold mb-2">Local Florida Coverage</h4>
          <p className="text-sm">Comprehensive coverage across Florida cities for both residential and commercial HVAC needs.</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="w-8 h-8 bg-blue-500 rounded text-white flex items-center justify-center text-sm font-bold mb-3">$</div>
          <h4 className="font-semibold mb-2">Instant Quotes & Reviews</h4>
          <p className="text-sm">Get instant quotes and read verified customer reviews before choosing your AC repair contractor.</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="w-8 h-8 bg-green-500 rounded text-white flex items-center justify-center text-sm font-bold mb-3">✓</div>
          <h4 className="font-semibold mb-2">No Hidden Fees</h4>
          <p className="text-sm">Transparent pricing with no hidden fees. Compare quotes from multiple AC repair contractors.</p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
