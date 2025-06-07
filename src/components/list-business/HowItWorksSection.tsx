
const HowItWorksSection = () => {
  return (
    <section className="mt-16 bg-gray-50 rounded-lg p-8">
      <h3 className="text-2xl font-bold text-center mb-8">How It Works - Start Getting AC Repair Customers Today</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-blue-600 font-bold text-xl">1</span>
          </div>
          <h4 className="text-xl font-semibold mb-3">Choose Your AC Business Plan</h4>
          <p className="text-gray-600 mb-4">
            Select the subscription plan that best fits your AC repair business size and goals. Start with Basic for new contractors or choose Premium/Enterprise for established AC repair companies looking to dominate their market.
          </p>
          <div className="text-sm text-gray-500">
            <strong>Takes:</strong> 2 minutes<br />
            <strong>Cost:</strong> Starting at $29/month
          </div>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-blue-600 font-bold text-xl">2</span>
          </div>
          <h4 className="text-xl font-semibold mb-3">Complete Payment & AC Business Setup</h4>
          <p className="text-gray-600 mb-4">
            Secure checkout process with no setup fees or hidden costs. After payment, you'll receive immediate access to create your detailed AC repair business listing with photos, services, and contact information.
          </p>
          <div className="text-sm text-gray-500">
            <strong>Takes:</strong> 5-10 minutes<br />
            <strong>Includes:</strong> AC business profile setup
          </div>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-blue-600 font-bold text-xl">3</span>
          </div>
          <h4 className="text-xl font-semibold mb-3">Go Live & Get AC Repair Customers</h4>
          <p className="text-gray-600 mb-4">
            Your AC repair business listing goes live immediately and starts appearing in search results for "AC repair near me" and commercial HVAC searches. Begin receiving customer inquiries and quote requests within 24-48 hours.
          </p>
          <div className="text-sm text-gray-500">
            <strong>Results:</strong> 24-48 hours<br />
            <strong>Average:</strong> 5-15 AC repair leads per month
          </div>
        </div>
      </div>

      {/* Success Metrics */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-2xl font-bold text-blue-600">50K+</div>
          <div className="text-sm text-gray-600">Monthly AC Repair Searches</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-2xl font-bold text-green-600">85%</div>
          <div className="text-sm text-gray-600">Customer Satisfaction</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-2xl font-bold text-purple-600">2.5x</div>
          <div className="text-sm text-gray-600">Average ROI</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-2xl font-bold text-orange-600">24h</div>
          <div className="text-sm text-gray-600">Time to First Lead</div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
