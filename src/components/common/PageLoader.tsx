
'use client';

import * as React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

export function PageLoader() {
  const [progress, setProgress] = React.useState(0);
  const timerRef = React.useRef<NodeJS.Timeout>();

  const start = React.useCallback(() => {
    setProgress(1); // Start the animation
    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) { // Cap at 95% to wait for completion
          clearInterval(timerRef.current!);
          return prev;
        }
        return prev + Math.random() * 10;
      });
    }, 300);
  }, []);

  const done = React.useCallback(() => {
    clearInterval(timerRef.current!);
    setProgress(100);
    setTimeout(() => {
        // Hide it after a short delay
        setProgress(p => p === 100 ? 0 : p);
    }, 400);
  }, []);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    done();
  }, [pathname, searchParams, done]);
  
  React.useEffect(() => {
    const originalPushState = history.pushState;

    history.pushState = function(...args) {
      const url = args[2];
      const newPath = url ? url.toString() : '';
      const currentPath = window.location.pathname + window.location.search;

      if (newPath && newPath !== currentPath) {
        requestAnimationFrame(start);
      }
      return originalPushState.apply(this, args);
    };

    const handlePopState = () => {
        requestAnimationFrame(start);
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      history.pushState = originalPushState;
      window.removeEventListener('popstate', handlePopState);
      clearInterval(timerRef.current!);
    };
  }, [start]);
  
  return (
    <div
      className={cn(
        'pointer-events-none fixed top-0 left-0 right-0 z-[9999] h-1 transition-opacity duration-300',
        progress > 0 ? 'opacity-100' : 'opacity-0'
      )}
    >
      <div
        className="h-full bg-primary transition-all duration-300 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
