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
  href?: string;
  type?: "button" | "submit" | "reset";
};

export default function Reveal({ as = "div", delay = 0, ...props }: RevealProps) {
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
      duration: 1.6,
      delay: delay + 0.18,
      ease: "power3.out",
      overwrite: "auto",
      scrollTrigger: {
        trigger: element,
        start: "top 86%",
        once: true,
      },
    });
  }, { scope, dependencies: [delay, reducedMotion], revertOnUpdate: true });

  return createElement(as, { ...props, ref: scope });
}
