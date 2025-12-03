import { ShinyButton } from "@/components/ui/shiny-button";

interface PricingSectionProps {
  onGetStarted: () => void;
}

const PricingSection = ({ onGetStarted }: PricingSectionProps) => {
  return (
    <section className="min-h-screen bg-foreground flex flex-col items-center justify-center px-6 py-24">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-6xl md:text-8xl font-light text-background mb-4">
          $4000.
        </h2>
        <p className="text-2xl md:text-3xl font-light text-background/80 mb-8">
          $3000 on ad spend
        </p>
        <p className="text-xs text-background/50 mb-16">
          All figures are USD, payable by stripe or by USDT/USDC (all chains) if necessary
        </p>

        <div className="mt-12">
          <h3 className="text-3xl md:text-4xl font-light text-background mb-8">
            Join Teams.
          </h3>
          <ShinyButton
            onClick={onGetStarted}
            className="text-background border border-background/10"
          >
            Get Started
          </ShinyButton>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
