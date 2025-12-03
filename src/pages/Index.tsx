import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ShaderHero from "@/components/ShaderHero";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import WaitlistHero from "@/components/WaitlistHero";
import RantForm from "@/components/RantForm";
import SuccessScreen from "@/components/SuccessScreen";
import BurnTransition from "@/components/BurnTransition";
import PremiumBankPage from "@/components/PremiumBankPage";
import { useToast } from "@/hooks/use-toast";

type PageState = "landing" | "waitlist" | "rant" | "success" | "premium";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<PageState>("landing");
  const [userEmail, setUserEmail] = useState("");
  const [showBurn, setShowBurn] = useState(false);
  const { toast } = useToast();

  const handleGetStarted = () => {
    setCurrentPage("waitlist");
  };

  const handleWaitlistSubmit = (email: string) => {
    setUserEmail(email);
    setCurrentPage("rant");
  };

  const handleRantSubmit = async (data: { email: string; rant: string; companyRevenue: string }) => {
    console.log("Submitting data:", data);

    toast({
      title: "Submission received!",
      description: "We'll review your message and get back to you soon.",
    });

    setCurrentPage("success");
  };

  const handlePrivateBankClick = () => {
    setShowBurn(true);
  };

  const handleBurnComplete = () => {
    setCurrentPage("premium");
    setShowBurn(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <BurnTransition isActive={showBurn} onComplete={handleBurnComplete} />

      <AnimatePresence mode="wait">
        {currentPage === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <ScrollProgressBar />
            <ShaderHero />
            <PricingSection onGetStarted={handleGetStarted} />
            <Footer onPrivateBankClick={handlePrivateBankClick} />
          </motion.div>
        )}

        {currentPage === "waitlist" && (
          <WaitlistHero key="waitlist" onSubmit={handleWaitlistSubmit} />
        )}

        {currentPage === "rant" && (
          <RantForm key="rant" email={userEmail} onSubmit={handleRantSubmit} />
        )}

        {currentPage === "success" && (
          <SuccessScreen key="success" />
        )}

        {currentPage === "premium" && (
          <PremiumBankPage key="premium" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
