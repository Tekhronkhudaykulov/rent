"use client";

import { useEffect, useState } from "react";
import { Car, User, Sparkles, Zap, Star } from "lucide-react";

interface CreativeLoadingProps {
  isVisible: boolean;
  onComplete: () => void;
}

export function CreativeLoading({
  isVisible,
  onComplete,
}: CreativeLoadingProps) {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState("Preparing the form...");

  const loadingTexts = [
    "Preparing the form...",
    "Loading driver data...",
    "Adjusting interface...",
    "Almost ready...",
  ];

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2;

        // Change loading text according to progress
        if (newProgress >= 25 && newProgress < 50) {
          setCurrentText(loadingTexts[1]);
        } else if (newProgress >= 50 && newProgress < 75) {
          setCurrentText(loadingTexts[2]);
        } else if (newProgress >= 75) {
          setCurrentText(loadingTexts[3]);
        }

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return newProgress;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center text-white">
        {/* Animated Icons */}
        <div className="flex justify-center items-center space-x-8 mb-8">
          <div className="relative">
            <Car className="w-16 h-16 text-blue-400 animate-bounce" />
            <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-spin" />
          </div>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"></div>
          <div className="relative">
            <User className="w-16 h-16 text-purple-400 animate-pulse" />
            <Star className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-ping" />
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-3xl font-bold mb-4 animate-fade-in">RENTCAR CRM</h2>

        <p className="text-xl mb-8 animate-fade-in animation-delay-200">
          {currentText}
        </p>

        {/* Progress Bar */}
        <div className="w-80 mx-auto mb-6">
          <div className="bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            </div>
          </div>
          <div className="text-center mt-2 text-sm opacity-80">{progress}%</div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 animate-float">
          <Zap className="w-8 h-8 text-yellow-400 opacity-60" />
        </div>
        <div className="absolute bottom-20 right-20 animate-float animation-delay-1000">
          <Sparkles className="w-6 h-6 text-pink-400 opacity-60" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float animation-delay-2000">
          <Star className="w-5 h-5 text-blue-400 opacity-60" />
        </div>
      </div>
    </div>
  );
}
