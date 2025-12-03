import { motion } from "framer-motion";

interface BurnTransitionProps {
  isActive: boolean;
  onComplete: () => void;
}

const BurnTransition = ({ isActive, onComplete }: BurnTransitionProps) => {
  if (!isActive) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onAnimationComplete={onComplete}
    >
      {/* Burn particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, ${
              Math.random() > 0.5 ? '#ff6b35' : Math.random() > 0.5 ? '#f7c59f' : '#ff4500'
            } 0%, transparent 70%)`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 3, 0],
            opacity: [0, 1, 0],
            y: [0, -100 - Math.random() * 200],
          }}
          transition={{
            duration: 1.5,
            delay: Math.random() * 0.5,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Main burn overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, #ff6b35 0%, #000 50%, #000 100%)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 3],
          opacity: [0, 1],
        }}
        transition={{
          duration: 1.2,
          ease: [0.4, 0, 0.2, 1],
        }}
      />

      {/* Final black overlay */}
      <motion.div
        className="absolute inset-0 bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      />
    </motion.div>
  );
};

export default BurnTransition;
