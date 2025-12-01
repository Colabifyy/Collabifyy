import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building2, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<"creator" | "brand" | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to continue",
        variant: "destructive",
      });
      setTimeout(() => {
        setLocation("/auth");
      }, 500);
    }
  }, [isAuthenticated, isLoading, toast]);

  const handleSelection = (type: "creator" | "brand") => {
    setSelectedType(type);
    setTimeout(() => {
      setLocation(`/waitlist?type=${type}`);
    }, 300);
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-background">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-background p-6">
      <div className="w-full max-w-5xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-foreground">
            Choose Your Path
          </h1>
          <p className="text-lg text-muted-foreground">
            Are you a creator or a brand? Let's get you started!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card
            className={`hover-elevate transition-all duration-300 cursor-pointer ${
              selectedType === "creator" ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => handleSelection("creator")}
            data-testid="card-choose-creator"
          >
            <CardHeader className="space-y-4">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground text-center">
                Join as Creator
              </h2>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground mb-6">
                Monetize your influence and connect with premium brands that align with your values and audience.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-foreground">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Access exclusive brand partnerships
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  AI-powered matching technology
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Secure payment processing
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelection("creator");
                }}
                data-testid="button-select-creator"
              >
                Get Started as Creator
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card
            className={`hover-elevate transition-all duration-300 cursor-pointer ${
              selectedType === "brand" ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => handleSelection("brand")}
            data-testid="card-choose-brand"
          >
            <CardHeader className="space-y-4">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground text-center">
                Join as Brand
              </h2>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground mb-6">
                Discover authentic creators who can amplify your message and drive real results for your campaigns.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-foreground">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Find verified, quality creators
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Data-driven audience insights
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Campaign ROI tracking
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelection("brand");
                }}
                data-testid="button-select-brand"
              >
                Get Started as Brand
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
