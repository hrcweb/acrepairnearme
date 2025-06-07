
import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Footer from "@/components/Footer";

const ContactSupport = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  // SEO optimization
  useEffect(() => {
    document.title = "Contact Support - AC Repair Near Me | Get Help with HVAC Services";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Contact our support team for help with AC repair near me and commercial HVAC services. Get assistance with finding contractors, quotes, and emergency repairs in Florida.'
      );
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Support form submitted:", formData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contact Support
          </h1>
          <h2 className="text-xl text-blue-100 max-w-2xl mx-auto">
            Need help finding AC repair near me or commercial HVAC services? We're here to assist you with any questions about our directory and contractor services.
          </h2>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="How can we help with AC repair services?"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please describe your question about AC repair contractors, commercial HVAC services, or our directory..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>

          {/* Contact Information */}
          <aside className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Email Support</h3>
                    <p className="text-gray-600">support@acrepairnearme.pro</p>
                    <p className="text-sm text-gray-500">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Phone Support</h3>
                    <p className="text-gray-600">561-206-2624</p>
                    <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Office Location</h3>
                    <p className="text-gray-600">
                      11987 Southern Blvd., 2020<br />
                      Royal Palm Beach, FL 33411
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">How do I find AC repair near me?</h4>
                    <p className="text-sm text-gray-600">Use our search tool to find verified AC repair contractors in your area. Enter your location to see available contractors with reviews and instant quotes.</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Do you have commercial AC repair contractors?</h4>
                    <p className="text-sm text-gray-600">Yes, our directory includes contractors specializing in commercial heating and air conditioning repair near me for businesses of all sizes.</p>
                  </div>
                  <div>
                    <h4 className="font-medium">How are AC repair contractors verified?</h4>
                    <p className="text-sm text-gray-600">We verify licenses, insurance, and business credentials for all listed AC repair and HVAC contractors.</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Is the service free for homeowners?</h4>
                    <p className="text-sm text-gray-600">Yes, our AC repair directory is completely free for homeowners and businesses to use.</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Do you offer emergency AC repair services?</h4>
                    <p className="text-sm text-gray-600">Our directory includes contractors offering 24/7 emergency AC repair and commercial HVAC services across Florida.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* Additional SEO Content */}
        <section className="mt-12 bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-center mb-6">
            Support for AC Repair & Commercial HVAC Services
          </h3>
          <div className="max-w-4xl mx-auto text-gray-700">
            <p className="mb-4">
              Our support team is dedicated to helping you find the best AC repair near me and commercial HVAC contractors in Florida. Whether you're a homeowner looking for residential AC repair or a business needing commercial heating and air conditioning repair near me, we're here to assist you throughout the process.
            </p>
            <p className="mb-4">
              We understand that finding reliable AC repair contractors can be challenging, especially during emergency situations. That's why our team is available to help you navigate our directory, understand contractor qualifications, and connect with the right professionals for your specific needs.
            </p>
            <p>
              Contact us today for assistance with finding verified AC repair contractors, understanding our verification process, or getting help with emergency HVAC services. We're committed to ensuring you have a positive experience with our platform.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactSupport;
