"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowRight, Check, Sparkles, Mail, User } from "lucide-react";
import Link from "next/link";

// Floating particle component
function FloatingParticle({
  delay,
  x,
  y,
  size,
}: {
  delay: number;
  x: string;
  y: string;
  size: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full bg-primary/20"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.2, 0.6, 0.2],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

// Success confetti burst
function SuccessParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * Math.PI * 2;
    const distance = 60 + Math.random() * 80;
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      color:
        i % 3 === 0
          ? "bg-primary"
          : i % 3 === 1
            ? "bg-secondary"
            : "bg-primary/60",
      size: 4 + Math.random() * 6,
    };
  });

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${p.color}`}
          style={{ width: p.size, height: p.size }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export default function WaitlistPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setIsSuccess(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen pt-10 pb-10 flex flex-col items-center justify-center overflow-hidden bg-background px-4">
      {/* ── Layered gradient background ────────────────────── */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Large primary radial */}
        <motion.div
          className="absolute -top-1/4 left-1/2 -translate-x-1/2 h-[900px] w-[900px] rounded-full bg-linear-to-br from-primary/25 via-secondary/15 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.08, 1],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Secondary glow bottom-right */}
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 h-[700px] w-[700px] rounded-full bg-linear-to-tl from-secondary/20 via-primary/10 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.12, 1],
            rotate: [0, -8, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        {/* Accent glow bottom-left */}
        <motion.div
          className="absolute bottom-1/4 -left-1/4 h-[500px] w-[500px] rounded-full bg-linear-to-tr from-primary/15 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.05, 1],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      {/* ── Floating particles ─────────────────────────────── */}
      <FloatingParticle delay={0} x="15%" y="20%" size={6} />
      <FloatingParticle delay={1.2} x="80%" y="15%" size={4} />
      <FloatingParticle delay={0.6} x="70%" y="70%" size={8} />
      <FloatingParticle delay={2} x="25%" y="75%" size={5} />
      <FloatingParticle delay={1.5} x="50%" y="85%" size={3} />
      <FloatingParticle delay={0.8} x="90%" y="50%" size={5} />
      <FloatingParticle delay={3} x="10%" y="55%" size={7} />
      <FloatingParticle delay={2.5} x="60%" y="30%" size={4} />

      {/* ── Main content ───────────────────────────────────── */}
      <motion.div
        className="relative z-10 flex flex-col items-center max-w-xl w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Logo size={56} />
        </motion.div>

        {/* Brand */}
        <motion.div
          className="mt-4 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span className="text-2xl font-bold tracking-tight text-foreground">
            Super<span className="text-primary">blogger</span>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="mt-6 text-center text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Something <span className="text-primary">amazing</span>
          <br />
          is coming
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-4 text-center text-sm md:text-base text-muted-foreground max-w-md leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          We&apos;re building the ultimate AI-powered content engine. Join our
          waitlist to get early access and be the first to know when we launch.
        </motion.p>

        {/* ── Form Card ────────────────────────────────────── */}
        <motion.div
          className="relative mt-10 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
        >
          <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl shadow-xl p-6 md:p-8">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-lg font-semibold text-foreground text-center">
                    Get early access
                  </h2>
                  <p className="text-xs text-muted-foreground text-center mb-2">
                    Be among the first to experience SuperBlogger.
                  </p>

                  {/* Name field */}
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background/80 pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Email field */}
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background/80 pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="w-full h-12 text-sm font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <motion.div
                        className="h-5 w-5 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    ) : (
                      <>
                        Join the Waitlist
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <p className="text-[11px] text-muted-foreground text-center">
                    No spam, ever. We&apos;ll only email you when we launch.
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  className="relative flex flex-col items-center py-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <SuccessParticles />

                  <motion.div
                    className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/15 mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 12,
                      delay: 0.15,
                    }}
                  >
                    <Check className="h-8 w-8 text-primary" />
                  </motion.div>

                  <h2 className="text-xl font-bold text-foreground">
                    You&apos;re on the list!
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground text-center max-w-xs">
                    Thanks for joining, {name.split(" ")[0]}! We&apos;ll let you
                    know as soon as we&apos;re ready to launch.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

    
      </motion.div>
    </div>
  );
}
