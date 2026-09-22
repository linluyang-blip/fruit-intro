"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type ParallaxProps = {
  children?: ReactNode;
  /** 正值：由下往上進入視窗時較慢，負值則相反；數字越大位移越明顯。 */
  speed?: number;
  className?: string;
  style?: CSSProperties;
};

export default function Parallax({
  children,
  speed = 0.15,
  className,
  style,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let ticking = false;
    let inView = false;

    const apply = () => {
      ticking = false;
      if (!inView) return;
      const rect = el.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const offset = (viewportCenter - elementCenter) * speed;
      el.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) onScroll();
      },
      { rootMargin: "25% 0px 25% 0px" }
    );
    observer.observe(el);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform", ...style }}>
      {children}
    </div>
  );
}
