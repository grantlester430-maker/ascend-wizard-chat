import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ShaderHero from "@/components/ShaderHero";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import WaitlistHero from "@/components/WaitlistHero";
import RantForm from "@/components/RantForm";
import SuccessScreen from "@/components/SuccessScreen";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type PageState = "landing" | "waitlist" | "rant" | "success";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<PageState>("landing");
  const [userEmail, setUserEmail] = useState("");
  const { toast } = useToast();

  const handleGetStarted = () => {
    setCurrentPage("waitlist");
  };

  const handleWaitlistSubmit = (email: string) => {
    setUserEmail(email);
    setCurrentPage("rant");
  };

  const handleRantSubmit = async (data: { email: string; firstName: string; lastName: string; rant: string; companyRevenue: string }) => {
    console.log("Submitting data:", data);

    // Save to database
    const { error: dbError } = await supabase
      .from('submissions')
      .insert({
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        company_revenue: data.companyRevenue,
        rant: data.rant,
      });

    if (dbError) {
      console.error("Error saving submission:", dbError);
    }

    // Send to Google Sheets via webhook (if configured)
    const SHEETS_WEBHOOK_URL = ""; // User can add their Google Sheets webhook URL here
    
    if (SHEETS_WEBHOOK_URL) {
      try {
        await fetch(SHEETS_WEBHOOK_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            companyRevenue: data.companyRevenue,
            rant: data.rant,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (error) {
        console.error("Error sending to sheets:", error);
      }
    }

    toast({
      title: "Submission received!",
      description: "We'll review your message and get back to you soon.",
    });

    setCurrentPage("success");
  };

  const handleBackToLanding = () => {
    setCurrentPage("landing");
  };

  const handleBackToWaitlist = () => {
    setCurrentPage("waitlist");
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
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
            <Footer />
          </motion.div>
        )}

        {currentPage === "waitlist" && (
          <WaitlistHero 
            key="waitlist" 
            onSubmit={handleWaitlistSubmit} 
            onBack={handleBackToLanding}
          />
        )}

        {currentPage === "rant" && (
          <RantForm 
            key="rant" 
            email={userEmail} 
            onSubmit={handleRantSubmit}
            onBack={handleBackToWaitlist}
          />
        )}

        {currentPage === "success" && (
          <SuccessScreen 
            key="success"
            onBack={handleBackToLanding}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
