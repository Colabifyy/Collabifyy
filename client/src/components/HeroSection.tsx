import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Building2 } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/CreatorCampaign.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Badge variant="secondary" className="text-sm" data-testid="badge-ai-powered">
              AI-Powered Platform
            </Badge>
            
            <h1 className="text-5xl lg:text-6xl font-display font-bold leading-tight text-foreground">
              Where Brands & Creators Connect Through AI
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Transform your collaborations with intelligent matchmaking, streamlined campaign management, and automated payment processing. All in one powerful platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth?type=creator">
                <a className="w-full sm:w-auto">
                  <Button size="lg" className="w-full gap-2" data-testid="button-join-creator">
                    <Users className="w-5 h-5" />
                    Join as Creator
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              </Link>
              <Link href="/auth?type=brand">
                <a className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full gap-2" data-testid="button-join-brand">
                    <Building2 className="w-5 h-5" />
                    Join as Brand
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-2" data-testid="text-stats-creators">
                <div className="h-2 w-2 bg-primary rounded-full" />
                Trusted by 500+ creators
              </div>
              <div className="flex items-center gap-2" data-testid="text-stats-brands">
                <div className="h-2 w-2 bg-primary rounded-full" />
                100+ brand partnerships
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Brands and creators collaborating"
                className="w-full h-auto"
                data-testid="img-hero"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
