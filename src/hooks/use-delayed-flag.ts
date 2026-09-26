import { useEffect, useState } from 'react';

export function useDelayedFlag(active: boolean, delayMs = 1000): boolean {
  const [isDelayedActive, setIsDelayedActive] = useState(false);
  const [prevActive, setPrevActive] = useState(active);

  if (active !== prevActive) {
    setPrevActive(active);
    if (!active) {
      setIsDelayedActive(false);
    }
  }

  useEffect(() => {
    if (!active) return;

    const timer = setTimeout(() => {
      setIsDelayedActive(true);
    }, delayMs);

    return () => {
      clearTimeout(timer);
    };
  }, [active, delayMs]);

  return active && isDelayedActive;
}
