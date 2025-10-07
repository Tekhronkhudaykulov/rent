"use client";

import { useState, useEffect } from "react";
import SafeRoad404 from "@/components/safe-road-404";

const NotFoundPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      {/* <SafeRoad404 /> */}
      Not Found
    </div>
  );
};

export default NotFoundPage;
