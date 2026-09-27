import { ReactNode, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(useGSAP);
type PageHeroProps = {
  theme: "about" | "work" | "impact" | "team" | "donate" | "contact" | "volunteer" | "privacy";
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
};

export default function PageHero({ theme, eyebrow, title, description }: PageHeroProps) {
  const scope = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    const copy = scope.current?.querySelector(".page-hero-copy");
    if (!copy || reducedMotion) return;

    gsap.fromTo(copy, { autoAlpha: 0, y: 30 }, {
      autoAlpha: 1,
      y: 0,
      duration: 1.45,
      delay: 0.16,
      ease: "power3.out",
    });
  }, { scope, dependencies: [reducedMotion], revertOnUpdate: true });

  return (
    <section ref={scope} className={`page-hero page-hero--${theme}`}>
      <span className="page-hero-orbit page-hero-orbit-left" aria-hidden="true" />
      <span className="page-hero-orbit page-hero-orbit-right" aria-hidden="true" />
      <div className="wrap page-hero-copy">
        <p className="eyebrow"><span />{eyebrow}</p>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
    </section>
  );
}
