
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Twitter, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ComingSoon({ userEmail }: { userEmail: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPreRegistered, setIsPreRegistered] = useState<null | boolean>(null);
  const [email, setEmail] = useState(userEmail ?? "");
  const { toast } = useToast();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const launchDate = new Date("2025-02-17T00:00:00").getTime();

  // Check if the user is pre-registered
  useEffect(() => {
    if (!email) return;
    const checkPreRegistration = async () => {
      try {
        const response = await fetch(`/api/pre-register?email=${email}`);
        const data = await response.json();

        if (response.ok) {
          setIsPreRegistered(data.isPreRegistered);
        } else {
          console.error("Failed to fetch pre-registration status:", data.error);
        }
      } catch (error) {
        console.error("Error checking pre-registration:", error);
      }
    };

    checkPreRegistration();
  }, [email]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/pre-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsPreRegistered(true);
        toast({
          title: "Registration Successful!",
          description:
            "You’re all set! Updates and tokens will be yours upon release.",
        });
        setEmail("");
      } else {
        toast({
          title: "Registration Failed",
          description: data.error || "Something went wrong.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative overflow-hidden">
      {/* Content container */}
      <div className="container mx-auto px-4 min-h-screen flex flex-col items-center justify-center relative z-10">
        {/* Beta badge */}
        <div className="flex items-center gap-0 mb-8">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-50 to-gray-100">
            Codechamp
          </span>
          <span className="px-2 py-1 rounded-full bg-gray-800/30 text-gray-400 text-xs">
            Beta
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-3xl sm:text-6xl md:text-7xl font-bold text-gray-200 mb-8 text-center">
          Pre-Register Now
        </h1>

        {/* Subheading */}
        <p className="text-gray-300 text-center mb-16">
          Be the first to know when we launch!<br />
          Pre-register today to receive product updates and{" "}
          <span className="text-blue-400 font-bold">free tokens</span> at
          launch.
        </p>

        {/* Countdown */}
        <div className="flex gap-4 mb-16">
          {[
            { value: timeLeft.days, label: "DAYS" },
            { value: timeLeft.hours, label: "HOURS" },
            { value: timeLeft.minutes, label: "MINUTES" },
            { value: timeLeft.seconds, label: "SECONDS" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 min-w-[100px] text-center border border-gray-700/20"
            >
              <div className="text-2xl font-bold text-white mb-1">
                {item.value.toString().padStart(2, "0")}
              </div>
              <div className="text-xs text-gray-400">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Pre-Register form */}
        {isPreRegistered === false && (
          <div className="w-full max-w-md mb-12">
            <p className="text-gray-300 text-center mb-4">
              Enter your email to pre-register:
            </p>
            <form onSubmit={handleRegister} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800/30 border-gray-700/30 text-white placeholder:text-gray-500 outline-transparent"
                disabled
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? "Loading..." : "Pre-register"}
              </Button>
            </form>
          </div>
        )}
        {isPreRegistered === true && (
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">
              You&#39;re Pre-Registered!
            </h2>
            <p className="text-gray-300">
              Thank you for signing up. You’ll receive updates soon!
            </p>
          </div>
        )}
        {/* Contact info */}
        <p className="text-gray-400 mb-4 text-center">
          If you have any questions, please contact us at:
          <br />
          <a
            href="mailto:contact@codechamp.com"
            className="text-gray-300 hover:text-gray-200 transition-colors"
          >
            contact@codechamp.com
          </a>
        </p>

        {/* Social links */}
        <div className="flex gap-6 mb-8">
          {[Twitter, Send, Instagram].map((Icon, index) => (
            <a
              key={index}
              href="#"
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Footer */}
        <footer className="text-gray-500 text-sm">
          © 2025 Codechamp, All rights reserved.
        </footer>
      </div>
    </main>
  );
}

