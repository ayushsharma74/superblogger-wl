"use client";

import { motion, Variants } from "framer-motion";
import { useState } from "react";

export default function Logo({
  size,
  strokeWidth = 13,
  loading = false,
}: {
  size: number;
  strokeWidth?: number;
  loading?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const glowVariants: Variants = {
    hidden: {
      opacity: 0,
      filter: "drop-shadow(0 0 0px rgba(255, 255, 255, 0))",
    },
    visible: {
      opacity: 1,
      filter: [
        "drop-shadow(0 0 2px rgba(255, 255, 255, 0.2))",
        "drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))",
        "drop-shadow(0 0 2px rgba(255, 255, 255, 0.2))",
      ],
      transition: {
        filter: {
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        },
      },
    },
  };

  // Alias loop to visible for glow since we want it constant
  glowVariants.loop = glowVariants.visible;

  const pathVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.2, duration: 0.8, ease: [0.42, 0, 0.58, 1] },
        opacity: { delay: i * 0.2, duration: 0.3 },
      },
    }),
    loop: (i: number) => ({
      pathLength: [0, 1, 1, 0],
      opacity: [1, 1, 1, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.4, 0.6, 1],
        delay: i * 0.2,
      },
    }),
  };

  const currentVariant = loading || isHovered ? "loop" : "visible";

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 127 225"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial="hidden"
      animate={currentVariant}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.2 },
      }}
      className="cursor-pointer"
    >
      <motion.g variants={glowVariants}>
        <motion.path
          d="M102.103 4H118.17C118.936 4 119.417 4.82514 119.041 5.49176L91.6447 54H121.793C122.567 54 123.048 54.8414 122.654 55.508L84.3236 120.5L114.08 121.433C114.929 121.459 115.36 122.465 114.794 123.099L91.6447 149"
          className="stroke-primary"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          variants={pathVariants}
          custom={1}
        />
        <motion.path
          d="M88.3236 4H54.7104C54.3442 4 54.0073 4.20012 53.8322 4.52167L4.12886 95.7735C3.76591 96.4398 4.24824 97.2518 5.00704 97.2518H47.7996C48.5511 97.2518 49.034 98.0497 48.6855 98.7155L21.655 150.357C21.3205 150.996 21.752 151.768 22.4716 151.818L48.1749 153.605C48.8237 153.65 49.2574 154.292 49.0568 154.911L28.1815 219.269C27.8446 220.307 29.1786 221.057 29.8908 220.229L84.1773 157.129"
          stroke="currentColor"
          className="stroke-primary"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          variants={pathVariants}
          custom={0}
        />
      </motion.g>
    </motion.svg>
  );
}
