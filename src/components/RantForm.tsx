"use client"

import { useState, useRef, FormEvent } from "react"
import { motion } from "framer-motion"

interface RantFormProps {
  email: string;
  onSubmit: (data: { email: string; rant: string; companyRevenue: string }) => void;
}

const SendIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 5.25L12 18.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.75 12L12 5.25L5.25 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const RantForm = ({ email, onSubmit }: RantFormProps) => {
  const [rant, setRant] = useState("")
  const [companyRevenue, setCompanyRevenue] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!rant.trim() || !companyRevenue.trim()) return

    setIsSubmitting(true)

    // Simulate submission delay
    setTimeout(() => {
      onSubmit({ email, rant, companyRevenue })
      setIsSubmitting(false)
    }, 1000)
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    if (value.length <= 2500) {
      setRant(value)
    }

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      const newHeight = Math.min(textareaRef.current.scrollHeight, 200)
      textareaRef.current.style.height = `${newHeight}px`
    }
  }

  const hasValue = rant.trim().length > 0 && companyRevenue.trim().length > 0

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex min-h-screen w-full flex-col items-center justify-center bg-waitlist-bg p-4"
    >
      <div className="w-full max-w-xl flex flex-col gap-10">
        <p className="text-center text-3xl text-foreground">
          How Can we Help You
        </p>

        {/* Company Revenue Input */}
        <div className="w-full">
          <label className="block text-sm text-muted-foreground mb-2">
            Company Monthly Revenue (USD)
          </label>
          <input
            type="text"
            required
            value={companyRevenue}
            onChange={(e) => setCompanyRevenue(e.target.value)}
            placeholder="e.g., $10,000"
            className="w-full px-4 py-3 rounded-xl bg-waitlist-input text-foreground border border-border/20 outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground"
          />
        </div>

        {/* Rant Form */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col rounded-[28px] p-2 shadow-sm transition-colors bg-waitlist-input border border-border/20">
            <textarea
              ref={textareaRef}
              rows={1}
              value={rant}
              onChange={handleTextareaChange}
              required
              placeholder="Just rant we will be able to help you better (2,500 word max)..."
              className="custom-scrollbar w-full resize-none border-0 bg-transparent p-3 text-foreground placeholder:text-muted-foreground focus:ring-0 focus-visible:outline-none min-h-[120px]"
            />

            <div className="mt-0.5 p-1 pt-0">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground pl-2">
                  {rant.length}/2500 characters
                </span>

                <button
                  type="submit"
                  disabled={!hasValue || isSubmitting}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none bg-foreground text-background hover:bg-foreground/80 disabled:bg-foreground/40"
                >
                  {isSubmitting ? (
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <SendIcon className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

export default RantForm;
