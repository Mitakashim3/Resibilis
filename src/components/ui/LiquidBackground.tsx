'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const LiquidBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-background pointer-events-none">
      {/* Paper Texture Overlay */}
      <div className="absolute inset-0 bg-paper-texture opacity-40 z-10" />

      {/* Abstract Object 1 - Large Soft Gradient Sphere */}
      <motion.div
        className="absolute -top-[10%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-primary-300/30 to-primary-400/30 dark:from-primary-800/20 dark:to-primary-900/20 blur-[80px]"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Abstract Object 2 - Floating "Paper" Rectangle */}
      <motion.div
        className="absolute top-[20%] left-[10%] w-32 h-48 bg-primary-200/20 dark:bg-primary-700/10 backdrop-blur-sm border border-primary-300/30 dark:border-primary-600/30 rounded-lg transform rotate-12"
        animate={{
          y: [0, -20, 0],
          rotate: [12, 15, 12],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Abstract Object 3 - Solid Circle Accent */}
      <motion.div
        className="absolute bottom-[15%] left-[20%] w-24 h-24 rounded-full bg-primary-500/10 dark:bg-primary-400/10 border border-primary-400/20"
        animate={{
          y: [0, 30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Abstract Object 4 - Large Bottom Blob */}
      <motion.div
        className="absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-primary-400/20 dark:bg-primary-800/20 blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Abstract Object 5 - Small Floating Square */}
      <motion.div
        className="absolute top-[40%] right-[20%] w-16 h-16 border-2 border-primary-300/20 dark:border-primary-600/20 rounded-xl rotate-45"
        animate={{
          rotate: [45, 90, 45],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};
