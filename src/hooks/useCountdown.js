import { useState, useEffect } from "react";

export const formatCountdown = (expiryDate) => {
  if (!expiryDate) {
    return "Expired";
  }

  const diff = expiryDate - Date.now();

  if (diff <= 0) {
    return "Expired";
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  }

  return `${hours}h ${minutes}m ${seconds}s`;
};

export const useCountdown = (expiryDate) => {
  const [countdown, setCountdown] = useState(() => formatCountdown(expiryDate));

  useEffect(() => {
    setCountdown(formatCountdown(expiryDate));

    if (!expiryDate || expiryDate <= Date.now()) {
      return undefined;
    }

    const timer = setInterval(() => {
      setCountdown(formatCountdown(expiryDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  return countdown;
};
