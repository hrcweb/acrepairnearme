
import { useState } from "react";
import { Plus, Minus, Phone, Mail, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Footer from "@/components/Footer";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "How do I find a reliable AC contractor near me?",
      answer: "Use our verified contractor directory by entering your ZIP code. All contractors are pre-screened, licensed, and insured. Look for verified badges, customer reviews, and response times to make your decision.",
      category: "finding-contractors"
    },
    {
      id: 2,
      question: "What should I do if my AC stops working?",
      answer: "First, check your thermostat settings and circuit breaker. Replace the air filter if it's dirty. If these steps don't help, contact one of our emergency contractors available 24/7.",
      category: "emergency"
    },
    {
      id: 3,
      question: "How much does AC repair typically cost?",
      answer: "AC repair costs vary depending on the issue. Simple fixes like filter replacement cost $20-50, while major repairs like compressor replacement can cost $1,500-3,000. Get multiple quotes from our verified contractors for accurate pricing.",
      category: "pricing"
    },
    {
      id: 4,
      question: "How often should I service my AC unit?",
      answer: "We recommend professional AC maintenance twice a year - before summer and winter. Regular maintenance can prevent 85% of AC problems and extend your system's lifespan by 5-10 years.",
      category: "maintenance"
    },
    {
      id: 5,
      question: "What are signs that I need a new AC system?",
      answer: "Consider replacement if your AC is over 15 years old, requires frequent repairs, has rising energy bills, or doesn't cool evenly. Our contractors can perform efficiency assessments to help you decide.",
      category: "replacement"
    },
    {
      id: 6,
      question: "Do you provide emergency AC repair services?",
      answer: "Yes! We have 24/7 emergency contractors available across Florida. Average response time is under 1 hour. Emergency services may cost more but prevent further damage to your system.",
      category: "emergency"
    },
    {
      id: 7,
      question: "How do I list my AC business on your platform?",
      answer: "Visit our 'List Your Business' page to choose a subscription plan. Plans start at $29/month and include business listing, customer reviews, and lead generation tools. Setup takes less than 10 minutes.",
      category: "business"
    },
    {
      id: 8,
      question: "Are the contractors on your platform licensed and insured?",
      answer: "Absolutely. We verify all contractor licenses, insurance, and business credentials before approval. Look for the verified badge on contractor profiles for additional assurance.",
      category: "verification"
    },
    {
      id: 9,
      question: "Can I get quotes from multiple contractors?",
      answer: "Yes! We recommend getting 2-3 quotes for major repairs or installations. Use our quote request form to contact multiple verified contractors in your area simultaneously.",
      category: "quotes"
    },
    {
      id: 10,
      question: "What financing options are available for AC replacement?",
      answer: "Many of our contractors offer financing options including 0% APR for qualified customers. Financing terms typically range from 12-84 months depending on the contractor and your credit.",
      category: "financing"
    }
  ];

  const categories = [
    { value: "all", label: "All Questions" },
    { value: "finding-contractors", label: "Finding Contractors" },
    { value: "emergency", label: "Emergency Services" },
    { value: "pricing", label: "Pricing & Costs" },
    { value: "maintenance", label: "Maintenance" },
    { value: "business", label: "Business Listings" }
  ];

  const filteredFAQs = selectedCategory === "all" 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about AC repair, maintenance, and our contractor directory.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.value)}
                className="mb-2"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFAQs.map((item) => (
            <Card key={item.id}>
              <Collapsible
                open={openItems.includes(item.id)}
                onOpenChange={() => toggleItem(item.id)}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-left text-lg font-medium">
                        {item.question}
                      </CardTitle>
                      {openItems.includes(item.id) ? (
                        <Minus className="w-5 h-5 text-gray-500" />
                      ) : (
                        <Plus className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-6">Still Have Questions?</h3>
          <p className="text-center text-gray-600 mb-8">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Email Support</h4>
              <p className="text-gray-600 text-sm mb-3">
                Get detailed answers to your questions
              </p>
              <Button variant="outline" size="sm">
                support@acrepairnearme.pro
              </Button>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Live Chat</h4>
              <p className="text-gray-600 text-sm mb-3">
                Chat with our team during business hours
              </p>
              <Button variant="outline" size="sm">
                Start Chat
              </Button>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Call Us</h4>
              <p className="text-gray-600 text-sm mb-3">
                Speak directly with our support team
              </p>
              <Button variant="outline" size="sm">
                (855) AC-REPAIR
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;
