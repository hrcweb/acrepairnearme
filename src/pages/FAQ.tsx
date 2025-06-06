
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "How do I find AC repair services near me?",
      answer: "Simply enter your zip code or city in our search bar, select the type of service you need, and browse through verified AC repair professionals in your area. All listings include ratings, reviews, and contact information."
    },
    {
      question: "Are all AC repair companies on your platform verified?",
      answer: "Yes! We verify all businesses through licensing checks, insurance verification, and background screening. Look for the verified badge next to business names for additional assurance."
    },
    {
      question: "How much does it cost to list my AC business?",
      answer: "We offer three tiers: Basic ($29/month), Premium ($79/month), and Enterprise ($149/month). Each tier offers different levels of visibility and features to help grow your business."
    },
    {
      question: "What's included in emergency AC repair services?",
      answer: "Emergency services typically include 24/7 availability, same-day repairs, diagnostic services, and temporary cooling solutions. Contact individual contractors for specific emergency service details."
    },
    {
      question: "How do I leave a review for an AC contractor?",
      answer: "After receiving service, you can leave a review by visiting the contractor's profile page and clicking the 'Write Review' button. Reviews help other customers make informed decisions."
    },
    {
      question: "What should I do if my AC stops working?",
      answer: "First, check your thermostat settings and circuit breaker. If the issue persists, contact one of our verified AC repair professionals for diagnosis and repair. Many offer emergency services for urgent situations."
    },
    {
      question: "Do you offer rebate information for AC installations?",
      answer: "Yes! Our Local Rebate Finder helps you discover federal, state, and utility rebates available in your area for energy-efficient AC installations and upgrades."
    },
    {
      question: "How can I get quotes from multiple contractors?",
      answer: "Use our 'Get Quote' feature on individual business listings to request estimates. We recommend getting quotes from 3-4 contractors to compare pricing and services."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/199e8012-a0ff-42e4-bcb0-b5aa38e394c5.png" 
                alt="AC Repair Near Me" 
                className="h-10 w-auto"
              />
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Find Contractors</a>
              <a href="/#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">List Your Business</a>
              <a href="/faq" className="text-gray-600 hover:text-blue-600 transition-colors">FAQ</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600">
              Find answers to common questions about AC repair services and our platform
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader 
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleItem(index)}
                >
                  <CardTitle className="flex items-center justify-between text-lg">
                    {faq.question}
                    {openItems.includes(index) ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </CardTitle>
                </CardHeader>
                {openItems.includes(index) && (
                  <CardContent className="pt-0">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  Still have questions?
                </h3>
                <p className="text-blue-700 mb-6">
                  Can't find the answer you're looking for? Our support team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="mailto:support@acrepairnearme.pro"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Email Support
                  </a>
                  <a 
                    href="tel:(855)227-3724"
                    className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Call (855) AC-REPAIR
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
