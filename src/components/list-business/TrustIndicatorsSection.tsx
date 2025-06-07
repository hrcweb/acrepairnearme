
import { CheckCircle } from "lucide-react";

const TrustIndicatorsSection = () => {
  return (
    <section className="mt-12 text-center">
      <h3 className="text-xl font-semibold mb-6">Trusted by AC Repair Professionals Across Florida</h3>
      <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>Licensed & Insured AC Contractors Only</span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>30-Day Money-Back Guarantee</span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>Cancel Anytime</span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>24/7 Support Available</span>
        </div>
      </div>
      
      <div className="mt-8 p-6 bg-blue-50 rounded-lg max-w-2xl mx-auto">
        <p className="text-blue-800 font-medium mb-2">
          "Since joining AC Repair Near Me, we've increased our monthly revenue by 40% and receive 3-5 qualified leads per week for both residential and commercial AC repair projects. The platform pays for itself!"
        </p>
        <p className="text-blue-600 text-sm">
          - Mike Rodriguez, Cool Air Solutions, Tampa
        </p>
      </div>
    </section>
  );
};

export default TrustIndicatorsSection;
