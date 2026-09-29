import { createElement, HTMLAttributes, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type RevealTag = "div" | "section" | "article" | "h3" | "h2" | "aside" | "nav" | "address" | "form" | "button" | "a";
type RevealProps = HTMLAttributes<any> & {
  as?: RevealTag;
  delay?: number;
  duration?: number;
  delayOffset?: number;
  start?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
};

export default function Reveal({ as = "div", delay = 0, duration = 1.6, delayOffset = 0.18, start = "top 86%", ...props }: RevealProps) {
  const scope = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    const element = scope.current;
    if (!element) return;

    if (reducedMotion) {
      gsap.set(element, { autoAlpha: 1, y: 0 });
      return;
    }

    gsap.fromTo(element, { autoAlpha: 0, y: 24 }, {
      autoAlpha: 1,
      y: 0,
      duration,
      delay: delay + delayOffset,
      ease: "power3.out",
      overwrite: "auto",
      scrollTrigger: {
        trigger: element,
        start,
        once: true,
      },
    });
  }, { scope, dependencies: [delay, duration, delayOffset, start, reducedMotion], revertOnUpdate: true });

  return createElement(as, { ...props, ref: scope });
}
