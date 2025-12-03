import { useState } from "react";
import { motion } from "framer-motion";
import { AdvancedChatInput, type FileAttachment } from "@/components/ui/advanced-ai-chat-input";
import { Button } from "@/components/ui/button";
import { Paperclip, ArrowLeft } from "lucide-react";
import { TextShimmer } from "@/components/ui/text-shimmer";

interface PremiumBankPageProps {
  onBack?: () => void;
}

const PremiumBankPage = ({ onBack }: PremiumBankPageProps) => {
  const [inputValue, setInputValue] = useState("");
  const [files, setFiles] = useState<FileAttachment[]>([]);

  const handleRemoveFile = (id: string | number) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  const handleSend = () => {
    if (!inputValue && files.length === 0) return;

    const submissionData = {
      portfolio_text: inputValue,
      files: files.map((f) => f.name),
      submitted_at: new Date().toISOString(),
    };

    console.log("Portfolio submission:", submissionData);

    setInputValue("");
    setFiles([]);
  };

  const handleFileUpload = () => {
    const mockFile: FileAttachment = {
      id: Date.now(),
      name: `file_${files.length + 1}.pdf`,
      icon: <Paperclip className="h-4 w-4 text-muted-foreground" />,
    };
    setFiles((prev) => [...prev, mockFile]);
  };

  const actionIcons = [
    <Button
      key="file"
      variant="ghost"
      size="icon"
      aria-label="Attach file"
      onClick={handleFileUpload}
      className="text-muted-foreground hover:text-foreground"
    >
      <Paperclip className="h-4 w-4" />
    </Button>,
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-4 relative"
    >
      {/* Back Arrow */}
      {onBack && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={onBack}
          className="absolute top-6 left-6 p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-6 w-6" />
        </motion.button>
      )}

      <div className="w-full max-w-xl flex flex-col gap-6">
        {/* Shimmering PREMIUM title with Garamond */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center"
        >
          <TextShimmer
            as="h1"
            duration={1.5}
            spread={3}
            className="text-4xl md:text-5xl tracking-[0.3em] font-normal [--base-color:theme(colors.amber.300)] [--base-gradient-color:theme(colors.yellow.100)] dark:[--base-color:theme(colors.amber.400)] dark:[--base-gradient-color:theme(colors.yellow.200)]"
            style={{ fontFamily: "'EB Garamond', 'Cormorant Garamond', Georgia, serif" }}
          >
            PREMIUM
          </TextShimmer>
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

        {/* Subtitle below chatbox */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="text-sm italic text-muted-foreground/70 tracking-wide text-center"
        >
          High end private bank for subject clients
        </motion.p>
      </div>
    </motion.div>
  );
};

export default PremiumBankPage;
