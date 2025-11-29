import { Badge } from "@/components/ui/badge";
import onboardingImage from "@assets/generated_images/signup.jpg";
import aiMatchingImage from "@assets/generated_images/ai_matchmaking_visualization.png";
import dashboardImage from "@assets/generated_images/campaign_dashboard_mockup.png";

const steps = [
  {
    number: "01",
    title: "Sign Up & Create Profile",
    description: "Get started in minutes. Build your profile with your expertise, audience demographics, and collaboration preferences.",
    image: onboardingImage,
    imageAlt: "Onboarding interface",
    reverse: false,
  },
  {
    number: "02",
    title: "Get Matched by AI",
    description: "Our intelligent algorithm analyzes thousands of data points to find your perfect matches. Quality over quantity, always.",
    image: aiMatchingImage,
    imageAlt: "AI matching visualization",
    reverse: true,
  },
  {
    number: "03",
    title: "Launch & Manage Campaigns",
    description: "Collaborate seamlessly with integrated tools for communication, content approval, and performance tracking.",
    image: dashboardImage,
    imageAlt: "Campaign dashboard",
    reverse: false,
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to transform your collaborations
          </p>
        </div>

        <div className="space-y-24">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                step.reverse ? "lg:grid-flow-dense" : ""
              }`}
              data-testid={`section-step-${index}`}
            >
              <div className={`space-y-6 ${step.reverse ? "lg:col-start-2" : ""}`}>
                <Badge variant="secondary" className="text-2xl font-bold px-4 py-2">
                  {step.number}
                </Badge>
                <h3 className="text-3xl font-display font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className={step.reverse ? "lg:col-start-1 lg:row-start-1" : ""}>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={step.image}
                    alt={step.imageAlt}
                    className="w-full h-auto"
                    data-testid={`img-step-${index}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
