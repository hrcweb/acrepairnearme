
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
      question: "How do I find reliable AC repair near me quickly?",
      answer: "Finding reliable AC repair near me is easy with our verified contractor directory. Simply enter your ZIP code to see licensed, insured contractors in your area. All AC repair near me specialists are pre-screened with verified badges, customer reviews, and guaranteed response times. Our platform connects you with local experts who understand Florida's unique climate challenges.",
      category: "finding-contractors"
    },
    {
      id: 2,
      question: "What should I do when my AC stops working during a Florida heatwave?",
      answer: "When your AC fails during extreme heat, first check your thermostat settings and circuit breaker. Replace dirty air filters immediately. If these steps don't restore cooling, contact our emergency AC repair near me contractors available 24/7. Many offer same-day service with average response times under 1 hour for critical repairs.",
      category: "emergency"
    },
    {
      id: 3,
      question: "How much does professional AC repair near me typically cost in Florida?",
      answer: "AC repair near me costs vary by complexity. Basic services like filter replacement cost $20-50, thermostat calibration runs $75-150, refrigerant recharge costs $150-400, and major repairs like compressor replacement range $1,500-3,000. Get multiple quotes from our verified AC repair near me contractors for accurate local pricing that reflects Florida market rates.",
      category: "pricing"
    },
    {
      id: 4,
      question: "What's included in commercial heating and air conditioning repair near me?",
      answer: "Commercial heating and air conditioning repair near me services include comprehensive system diagnostics, HVAC maintenance contracts, emergency repairs, ductwork inspection, air quality testing, and energy efficiency assessments. Our commercial heating and air conditioning repair near me specialists handle rooftop units, chillers, boilers, and complex multi-zone systems for businesses of all sizes.",
      category: "commercial"
    },
    {
      id: 5,
      question: "How often should I schedule maintenance for AC repair near me services?",
      answer: "Schedule professional AC repair near me maintenance twice yearly - before summer and winter seasons. Regular maintenance prevents 85% of AC problems, extends system lifespan by 5-10 years, and maintains energy efficiency. Florida's harsh climate makes bi-annual AC repair near me check-ups essential for optimal performance and warranty compliance.",
      category: "maintenance"
    },
    {
      id: 6,
      question: "What are the signs I need immediate AC repair near me?",
      answer: "Call for AC repair near me immediately if you notice: warm air from vents, unusual noises (grinding, squealing), frequent cycling on/off, water leaks around the unit, burning smells, or dramatically increased energy bills. These symptoms indicate serious issues requiring professional AC repair near me intervention to prevent complete system failure.",
      category: "emergency"
    },
    {
      id: 7,
      question: "Do you provide emergency commercial AC repair near me services?",
      answer: "Yes! Our network includes 24/7 emergency commercial AC repair near me specialists across Florida. Commercial AC repair near me services feature rapid response for business-critical cooling needs, with most commercial AC repair near me contractors arriving within 2 hours. Emergency commercial rates apply, but prevent costly business downtime and inventory damage.",
      category: "commercial"
    },
    {
      id: 8,
      question: "How do I choose between repair and replacement for my AC system?",
      answer: "Consider AC replacement if your system is over 15 years old, requires frequent AC repair near me visits, shows rising energy costs, or doesn't cool evenly. Our contractors provide efficiency assessments comparing repair costs versus new system benefits. Generally, if repair costs exceed 50% of replacement value, upgrade to a modern, efficient unit.",
      category: "replacement"
    },
    {
      id: 9,
      question: "Are all AC repair near me contractors on your platform properly licensed?",
      answer: "Absolutely. Every AC repair near me contractor undergoes rigorous verification including license validation, insurance confirmation, and business credential checks. Look for the verified badge on contractor profiles. Our AC repair near me specialists maintain current Florida HVAC licenses, liability insurance, and workers' compensation coverage for your protection.",
      category: "verification"
    },
    {
      id: 10,
      question: "Can I get multiple quotes for AC repair near me services?",
      answer: "Yes! We encourage getting 2-3 quotes for major AC repair near me projects. Use our quote request form to simultaneously contact multiple verified AC repair near me contractors in your area. Compare pricing, warranties, and service timelines to make informed decisions about your AC repair near me needs.",
      category: "quotes"
    },
    {
      id: 11,
      question: "What financing options are available for AC repair near me projects?",
      answer: "Many AC repair near me contractors offer flexible financing including 0% APR for qualified customers, extended payment plans from 12-84 months, and seasonal promotions. Commercial heating and air conditioning repair near me services often include business financing options with competitive rates for equipment upgrades and system replacements.",
      category: "financing"
    },
    {
      id: 12,
      question: "How do I prepare for an AC repair near me service visit?",
      answer: "Before your AC repair near me appointment: clear access to indoor/outdoor units, note specific symptoms and when they started, have your system's model/serial numbers ready, and prepare questions about maintenance recommendations. Good preparation helps AC repair near me technicians diagnose issues faster and provide more accurate estimates.",
      category: "preparation"
    },
    {
      id: 13,
      question: "What makes commercial AC repair near me different from residential service?",
      answer: "Commercial AC repair near me involves larger, more complex systems like rooftop packages, chillers, and building automation systems. Commercial AC repair near me technicians need specialized training for commercial equipment, understand business continuity needs, and often work outside normal hours to minimize operational disruption. Commercial heating and air conditioning repair near me also includes preventive maintenance contracts.",
      category: "commercial"
    },
    {
      id: 14,
      question: "How can I prevent the need for emergency AC repair near me calls?",
      answer: "Prevent emergency AC repair near me situations by: changing filters monthly during peak season, keeping outdoor units clear of debris, scheduling bi-annual professional maintenance, monitoring thermostat settings, and addressing minor issues promptly. Regular maintenance reduces emergency AC repair near me calls by up to 80% and extends equipment life significantly.",
      category: "prevention"
    },
    {
      id: 15,
      question: "What should I expect during a commercial heating and air conditioning repair near me consultation?",
      answer: "During commercial heating and air conditioning repair near me consultations, expect: comprehensive system assessment, energy efficiency analysis, maintenance schedule recommendations, cost estimates for repairs/upgrades, and discussion of service contracts. Commercial heating and air conditioning repair near me specialists also evaluate indoor air quality and compliance with building codes.",
      category: "commercial"
    },
    {
      id: 16,
      question: "How do I list my AC repair business on your platform?",
      answer: "List your AC repair near me business by visiting our 'List Your Business' page and selecting a subscription plan. Plans start at $29/month for basic listings up to $199/month for premium banner advertising. Setup includes business verification, customer review integration, and lead generation tools. Complete the process in under 10 minutes to start receiving local AC repair near me leads.",
      category: "business"
    },
    {
      id: 17,
      question: "What warranties should I expect from AC repair near me services?",
      answer: "Professional AC repair near me services typically include: 90-day labor warranties, manufacturer warranties on parts (1-10 years depending on component), and satisfaction guarantees. Commercial heating and air conditioning repair near me often features extended warranty options and service agreements covering regular maintenance and priority repairs.",
      category: "warranties"
    },
    {
      id: 18,
      question: "How do seasonal changes in Florida affect my need for AC repair near me?",
      answer: "Florida's climate creates unique AC repair near me demands: spring requires system start-up and filter changes, summer brings peak usage and potential breakdowns, fall allows for maintenance before heating season, and winter may reveal heating system issues. Year-round humidity also increases the need for regular AC repair near me maintenance to prevent mold and efficiency loss.",
      category: "seasonal"
    }
  ];

  const categories = [
    { value: "all", label: "All Questions" },
    { value: "finding-contractors", label: "Finding Contractors" },
    { value: "emergency", label: "Emergency Services" },
    { value: "commercial", label: "Commercial Services" },
    { value: "pricing", label: "Pricing & Costs" },
    { value: "maintenance", label: "Maintenance" },
    { value: "prevention", label: "Prevention Tips" },
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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find comprehensive answers about AC repair near me, commercial heating and air conditioning repair near me, emergency services, and our contractor directory across Florida.
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

        {/* SEO Content Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your Complete Guide to AC Repair Near Me in Florida
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-4">
                Finding reliable <strong>AC repair near me</strong> doesn't have to be stressful. Our comprehensive directory connects Florida residents and businesses with verified, licensed contractors specializing in residential and <strong>commercial heating and air conditioning repair near me</strong>. Whether you need emergency service, routine maintenance, or complete system replacement, our network of professional <strong>commercial AC repair near me</strong> specialists ensures you stay cool year-round.
              </p>
              <p className="text-gray-700">
                From Miami to Jacksonville, our <strong>AC repair near me</strong> contractors understand Florida's unique climate challenges and provide solutions tailored to local conditions. Get started today by entering your ZIP code to find qualified <strong>commercial heating and air conditioning repair near me</strong> professionals in your area.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-6">Still Have Questions About AC Repair Near Me?</h3>
          <p className="text-center text-gray-600 mb-8">
            Can't find what you're looking for? Our expert support team specializes in AC repair near me solutions and is here to help.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Email Support</h4>
              <p className="text-gray-600 text-sm mb-3">
                Get detailed answers about AC repair near me services
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
                Chat about commercial AC repair near me options
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
                Speak with our AC repair near me specialists
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
