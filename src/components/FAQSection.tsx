
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does the vetting process work for AC contractors?",
      answer: "All contractors in our directory go through a comprehensive vetting process including license verification, insurance confirmation, background checks, and customer review analysis. We only list contractors who meet our strict quality standards."
    },
    {
      question: "Are the quotes really free with no obligation?",
      answer: "Yes, all quotes are completely free with no obligation. Our contractors provide transparent pricing upfront, and you're never required to hire anyone. Compare multiple quotes to find the best value for your AC repair needs."
    },
    {
      question: "How quickly can I get AC repair service?",
      answer: "Many of our contractors offer same-day and emergency AC repair services. Response times vary by location and season, but we prioritize connecting you with contractors who can address your needs as quickly as possible."
    },
    {
      question: "What if I'm not satisfied with the contractor's work?",
      answer: "We work with contractors who stand behind their work with warranties and guarantees. If you experience any issues, our support team will help resolve the situation and ensure you receive quality service."
    },
    {
      question: "Do you service commercial HVAC systems?",
      answer: "Yes, our directory includes contractors who specialize in both residential and commercial HVAC systems. When requesting a quote, specify that you need commercial service to be matched with appropriate contractors."
    },
    {
      question: "Are your contractors available for emergency AC repairs?",
      answer: "Many contractors in our network offer 24/7 emergency AC repair services. This is especially important during Florida's hot summers when AC failures can be dangerous. Emergency services may include additional fees."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Get answers to common questions about our AC repair directory and services
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="transition-all duration-200 hover:shadow-md">
                <CardHeader 
                  className="cursor-pointer"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <CardTitle className="flex items-center justify-between text-lg">
                    <span>{faq.question}</span>
                    {openFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </CardTitle>
                </CardHeader>
                {openFAQ === index && (
                  <CardContent className="pt-0">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              Still have questions? <a href="/contact-support" className="text-blue-600 hover:underline">Contact our support team</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
