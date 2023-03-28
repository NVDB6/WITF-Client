import { useEffect, useState } from "react";

// Returns number of seconds
const useExpiryCountdown = (expiryDate: Date) => {
  const [expiryTime, setExpiryTime] = useState<string>();

  useEffect(() => {
    const timer = setInterval(() => {
      let seconds = (expiryDate.getTime() - new Date().getTime()) / 1000;
      const d = Math.floor(seconds / (3600 * 24));
      const h = Math.floor((seconds % (3600 * 24)) / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = Math.floor(seconds % 60);

      setExpiryTime(
        `${d && `${d}d `}${h && `${h}h `}${m && `${m}m `}${`${s}s`}`
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return { expiryTime };
};

export default useExpiryCountdown;
