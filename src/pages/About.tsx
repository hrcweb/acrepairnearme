
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, MapPin, Phone } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              About AC Repair Near Me
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100">
              Florida's trusted directory for professional AC repair, installation, and maintenance services
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Our Story */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 space-y-4">
              <p>
                Founded in 2020, AC Repair Near Me was born out of a simple mission: to connect Florida homeowners 
                with reliable, professional AC repair and HVAC contractors when they need them most.
              </p>
              <p>
                Living in Florida's hot and humid climate, we understand that a broken air conditioner isn't just 
                an inconvenience—it's an emergency. That's why we've built a comprehensive directory of verified, 
                licensed contractors who are ready to help restore your comfort quickly and professionally.
              </p>
              <p>
                Over the years, we've helped thousands of Florida families find trusted AC professionals, 
                from emergency repairs to routine maintenance and new system installations.
              </p>
            </CardContent>
          </Card>

          {/* Our Mission */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 space-y-4">
              <p>
                Our mission is to make finding reliable AC repair services as easy as possible. We believe that 
                every Florida resident deserves access to quality HVAC services without the stress of wondering 
                if they're hiring the right contractor.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Verified Contractors</h3>
                    <p className="text-sm">All listed contractors are licensed and insured</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Customer First</h3>
                    <p className="text-sm">Your satisfaction and comfort are our top priorities</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Local Expertise</h3>
                    <p className="text-sm">Contractors who understand Florida's unique climate challenges</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="w-6 h-6 text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">24/7 Emergency</h3>
                    <p className="text-sm">Emergency services available when you need them most</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why Choose Us */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">Why Choose AC Repair Near Me?</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Rigorous Screening</h3>
                  <p className="text-sm">Every contractor is thoroughly vetted for licensing, insurance, and customer satisfaction</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Local Network</h3>
                  <p className="text-sm">Extensive network of local contractors across all major Florida cities and counties</p>
                </div>
                <div className="text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Fast Response</h3>
                  <p className="text-sm">Quick connections to available contractors, especially for emergency situations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">Get In Touch</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p className="mb-4">
                Have questions about our service or want to learn more about listing your business? 
                We'd love to hear from you.
              </p>
              <div className="space-y-2">
                <p>
                  <strong>Email:</strong> info@acrepairnearme.com
                </p>
                <p>
                  <strong>Business Inquiries:</strong> business@acrepairnearme.com
                </p>
                <p>
                  <strong>Service Area:</strong> All of Florida
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default About;
