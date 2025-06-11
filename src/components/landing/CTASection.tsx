import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-12">
          {/* Main CTA Content */}
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 text-white/90">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Professional Storage Management</span>
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Ready to Master Your{" "}
              <span className="text-yellow-300">
                Azure Storage?
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Join cloud administrators and teams who trust BlobNest for professional 
              Azure Blob Storage management. Start organizing your storage today!
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">Enterprise</div>
              <div className="text-white/80">Grade Security</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">Real-time</div>
              <div className="text-white/80">Monitoring</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <span className="text-3xl md:text-4xl font-bold text-white">24/7</span>
                <Star className="w-6 h-6 text-yellow-300 fill-current" />
              </div>
              <div className="text-white/80">Support Ready</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-white text-blue-600 font-semibold px-8 py-3 text-lg hover:bg-gray-100 transition-colors"
              >
                <Link to="/signup">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white text-white font-semibold px-8 py-3 text-lg hover:bg-white/10 transition-colors"
              >
                <Link to="/login">
                  Sign In
                </Link>
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>Connect Azure account</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>Role-based access</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>Enterprise security</span>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div>
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-white" />
                    <span className="text-white font-medium">
                      Trusted by cloud administrators and development teams worldwide
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-300 fill-current" />
                    ))}
                    <span className="text-white/90 ml-2 font-medium">
                      Professional Grade
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
} 