import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { CheckCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";

export default function WaitlistPage() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [userType, setUserType] = useState<"creator" | "brand">("creator");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyOrHandle: "",
    message: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type") as "creator" | "brand";
    if (type) setUserType(type);
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to join the waitlist",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [isAuthenticated, isLoading, toast]);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest("POST","/api/waitlist",{
        userType,
        name: data.name,
        email: data.email,
        companyOrHandle: data.companyOrHandle,
        message: data.message,
      });
    },
    onSuccess: () => {
      setSubmitted(true);
    },
    onError: (error: Error) => {
      // 🚨 DEBUG ALERT ADDED HERE
      alert("DEBUG ERROR: " + error.message);
      
      if (isUnauthorizedError(error)) {
        toast({
          title: "Session Expired",
          description: "Please sign in again",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-background">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-background p-6">
        <Card className="w-full max-w-md text-center" data-testid="card-success">
          <CardContent className="pt-12 pb-12 space-y-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground">
              You're on the list!
            </h2>
            <p className="text-muted-foreground">
              Thanks for joining the waitlist. We'll be in touch soon with early access to Collabifyy.
            </p>
            <Button onClick={() => setLocation("/")} data-testid="button-back-home">
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-background p-6">
      <Card className="w-full max-w-2xl" data-testid="card-waitlist">
        <CardHeader className="space-y-2">
          <h1 className="text-3xl font-display font-bold text-foreground">
            Join the Waitlist
          </h1>
          <p className="text-muted-foreground">
            {userType === "creator"
              ? "Be among the first creators to experience Collabifyy"
              : "Get early access to our platform for brands"}
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  data-testid="input-name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  data-testid="input-email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyOrHandle">
                {userType === "brand" ? "Company Name" : "Social Media Handle"}
              </Label>
              <Input
                id="companyOrHandle"
                value={formData.companyOrHandle}
                onChange={(e) =>
                  setFormData({ ...formData, companyOrHandle: e.target.value })
                }
                placeholder={
                  userType === "brand" ? "Acme Inc." : "@yourhandle"
                }
                data-testid="input-company-handle"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Tell us about yourself</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={
                  userType === "brand"
                    ? "What types of campaigns are you interested in?"
                    : "What's your content niche and audience size?"
                }
                rows={4}
                data-testid="textarea-message"
              />
            </div>

            <div className="flex gap-4">
              <Button 
                type="submit" 
                className="flex-1" 
                disabled={mutation.isPending}
                data-testid="button-submit-waitlist"
              >
                {mutation.isPending ? "Submitting..." : "Join Waitlist"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setLocation("/dashboard")}
                data-testid="button-back"
              >
                Back
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}