import { useState } from "react";
import { motion } from "framer-motion";
import { AdvancedChatInput, type FileAttachment } from "@/components/ui/advanced-ai-chat-input";
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";

const PremiumBankPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [files, setFiles] = useState<FileAttachment[]>([]);

  const handleRemoveFile = (id: string | number) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  const handleSend = () => {
    if (!inputValue && files.length === 0) return;

    // Data structure ready for Supabase integration
    const submissionData = {
      portfolio_text: inputValue,
      files: files.map((f) => f.name),
      submitted_at: new Date().toISOString(),
    };

    console.log("Portfolio submission:", submissionData);

    // Reset after submission
    setInputValue("");
    setFiles([]);
  };

  const handleFileUpload = () => {
    // Placeholder for file upload - ready for Supabase storage integration
    const mockFile: FileAttachment = {
      id: Date.now(),
      name: `image_${files.length + 1}.png`,
      icon: <ImagePlus className="h-4 w-4 text-muted-foreground" />,
    };
    setFiles((prev) => [...prev, mockFile]);
  };

  const actionIcons = [
    <Button
      key="image"
      variant="ghost"
      size="icon"
      aria-label="Attach image"
      onClick={handleFileUpload}
      className="text-muted-foreground hover:text-foreground"
    >
      <ImagePlus className="h-4 w-4" />
    </Button>,
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-4"
    >
      <div className="w-full max-w-xl flex flex-col gap-6">
        {/* Shimmering PREMIUM title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center"
        >
          <h1
            className="text-4xl md:text-5xl font-bold tracking-[0.3em] bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]"
            style={{
              textShadow: '0 0 40px rgba(255, 215, 0, 0.3)',
            }}
          >
            PREMIUM
          </h1>
          <p className="mt-3 text-sm italic text-muted-foreground/70 tracking-wide">
            High end private bank for subject clients
          </p>
        </motion.div>

        {/* Chat Input */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <AdvancedChatInput
            value={inputValue}
            onChange={(e) => {
              if (e.target.value.length <= 2500) {
                setInputValue(e.target.value);
              }
            }}
            placeholder="Your portfolio..."
            files={files}
            onFileRemove={handleRemoveFile}
            onSend={handleSend}
            actionIcons={actionIcons}
            maxLength={2500}
            className="bg-zinc-900/80 border-zinc-800"
            textareaProps={{
              onKeyDown: (e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              },
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PremiumBankPage;
