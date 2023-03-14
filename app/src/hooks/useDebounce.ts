import { useRef } from "react";

export const useDebounce = (ms: number) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  return (cb: () => void) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(cb, ms);
  };
};
