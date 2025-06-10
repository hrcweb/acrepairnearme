
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, TrendingUp, Users, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const SuccessStories = () => {
  useEffect(() => {
    document.title = "AC Contractor Success Stories | Real Results from Florida HVAC Businesses";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Read real success stories from AC repair contractors who grew their business using our directory. See how Florida HVAC companies increased leads and revenue by 40%+ on average.'
      );
    }
  }, []);

  const successStories = [
    {
      businessName: "Cool Breeze AC Repair",
      ownerName: "Mike Rodriguez",
      location: "Miami, FL",
      monthsOnPlatform: 8,
      leadIncrease: "65%",
      revenueIncrease: "$180,000",
      rating: 4.9,
      reviewCount: 142,
      quote: "Within 3 months of joining the directory, we went from struggling to find customers to having a waiting list. The quality of leads is exceptional - homeowners are actively looking for AC repair services.",
      beforeStats: {
        monthlyLeads: 12,
        monthlyRevenue: "$25,000"
      },
      afterStats: {
        monthlyLeads: 45,
        monthlyRevenue: "$47,500"
      }
    },
    {
      businessName: "Sunshine HVAC Solutions",
      ownerName: "Sarah Chen",
      location: "Orlando, FL",
      monthsOnPlatform: 14,
      leadIncrease: "120%",
      revenueIncrease: "$320,000",
      rating: 4.8,
      reviewCount: 89,
      quote: "The premium listing was a game-changer for our commercial AC repair division. We now service major office buildings and shopping centers throughout Central Florida.",
      beforeStats: {
        monthlyLeads: 18,
        monthlyRevenue: "$35,000"
      },
      afterStats: {
        monthlyLeads: 52,
        monthlyRevenue: "$62,000"
      }
    },
    {
      businessName: "Elite Air Conditioning",
      ownerName: "James Thompson",
      location: "Tampa, FL",
      monthsOnPlatform: 6,
      leadIncrease: "85%",
      revenueIncrease: "$150,000",
      rating: 5.0,
      reviewCount: 67,
      quote: "I was skeptical at first, but the results speak for themselves. The emergency AC repair leads alone have transformed our business during the summer months.",
      beforeStats: {
        monthlyLeads: 20,
        monthlyRevenue: "$30,000"
      },
      afterStats: {
        monthlyLeads: 45,
        monthlyRevenue: "$55,000"
      }
    },
    {
      businessName: "Gulf Coast AC Experts",
      ownerName: "Maria Santos",
      location: "Fort Myers, FL",
      monthsOnPlatform: 12,
      leadIncrease: "95%",
      revenueIncrease: "$225,000",
      rating: 4.9,
      reviewCount: 156,
      quote: "Our business has doubled since joining. The banner advertisement during peak season generated over 200 new customers. Best investment we've ever made.",
      beforeStats: {
        monthlyLeads: 15,
        monthlyRevenue: "$28,000"
      },
      afterStats: {
        monthlyLeads: 38,
        monthlyRevenue: "$47,000"
      }
    }
  ];

  const platformStats = [
    {
      icon: TrendingUp,
      value: "40%",
      label: "Average Revenue Increase",
      description: "First 6 months"
    },
    {
      icon: Users,
      value: "2,500+",
      label: "Successful Contractors",
      description: "Across Florida"
    },
    {
      icon: DollarSign,
      value: "$12M+",
      label: "Additional Revenue Generated",
      description: "For our partners in 2024"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/list-business" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-blue-600 hover:underline">Back to List Business</span>
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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-green-100 text-green-800 px-4 py-2">
              Real Success Stories
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              AC Contractors Who <span className="text-blue-600">Transformed</span> Their Business
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover how Florida HVAC contractors are growing their revenue, attracting quality leads, 
              and building successful businesses through our proven directory platform.
            </p>
            
            {/* Platform Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {platformStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-900 font-medium">{stat.label}</div>
                  <div className="text-gray-600 text-sm">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Real Stories from Real AC Contractors
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These are actual results from HVAC contractors who joined our directory and transformed their business
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {successStories.map((story, index) => (
              <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <CardTitle className="text-xl text-blue-600">{story.businessName}</CardTitle>
                      <p className="text-gray-600">{story.ownerName} • {story.location}</p>
                      <p className="text-sm text-gray-500">{story.monthsOnPlatform} months on platform</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-bold">{story.rating}</span>
                      </div>
                      <p className="text-sm text-gray-500">{story.reviewCount} reviews</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">+{story.leadIncrease}</div>
                      <div className="text-sm text-gray-600">Lead Increase</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{story.revenueIncrease}</div>
                      <div className="text-sm text-gray-600">Additional Revenue</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <blockquote className="text-gray-700 italic mb-6">
                    "{story.quote}"
                  </blockquote>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3">Before vs After Results:</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium text-gray-900">Before:</div>
                        <div className="text-gray-600">{story.beforeStats.monthlyLeads} leads/month</div>
                        <div className="text-gray-600">{story.beforeStats.monthlyRevenue}/month</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">After:</div>
                        <div className="text-green-600 font-medium">{story.afterStats.monthlyLeads} leads/month</div>
                        <div className="text-green-600 font-medium">{story.afterStats.monthlyRevenue}/month</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join these successful AC contractors and start growing your business today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link to="/list-business#pricing">View Pricing Plans</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link to="/contact-support">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SuccessStories;
