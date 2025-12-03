"use client"

import { useState, useRef, FormEvent } from "react"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"

interface WaitlistHeroProps {
  onSubmit: (email: string) => void;
  onBack?: () => void;
}

export const WaitlistHero = ({ onSubmit, onBack }: WaitlistHeroProps) => {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus("loading")

    setTimeout(() => {
      setStatus("success")
      fireConfetti()
      setTimeout(() => {
        onSubmit(email)
      }, 1500)
    }, 1500)
  }

  const fireConfetti = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      color: string;
      size: number;
    }> = []
    const colors = ["#0079da", "#10b981", "#fbbf24", "#f472b6", "#fff"]

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const createParticle = () => {
      return {
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 2) * 10,
        life: 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 4 + 2,
      }
    }

    for (let i = 0; i < 50; i++) {
      particles.push(createParticle())
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, index) => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.2
        p.life--

        ctx.globalAlpha = p.life / 100
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        if (p.life <= 0) {
          particles.splice(index, 1)
        }
      })

      if (particles.length > 0) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative flex min-h-screen w-full flex-col items-center justify-center bg-waitlist-bg p-4"
    >
      {/* Back Arrow */}
      {onBack && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={onBack}
          className="absolute top-6 left-6 p-2 text-muted-foreground hover:text-foreground transition-colors z-20"
          aria-label="Go back"
        >
          <ArrowLeft className="h-6 w-6" />
        </motion.button>
      )}

      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <div className="relative z-10 w-full max-w-md text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4 text-4xl font-light text-foreground"
        >
          Join the Waitlist
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 text-muted-foreground"
        >
          Be the first to know when we launch
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={status !== "idle"}
            className="w-full px-4 py-3 rounded-xl bg-waitlist-input text-foreground border border-border/20 outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={status !== "idle"}
            className="w-full px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "idle" && "Join Waitlist"}
            {status === "loading" && (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </span>
            )}
            {status === "success" && "✓ Success!"}
          </button>
        </motion.form>
      </div>
    </motion.div>
  )
}

export default WaitlistHero;