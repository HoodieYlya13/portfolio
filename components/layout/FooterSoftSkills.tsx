"use client";

import { useEffect, useState } from "react";
import SplitText from "@/components/react-bits/SplitText";

const ROTATE_MS = 3000;

interface FooterSoftSkillsProps {
  skills: string[];
}

export default function FooterSoftSkills({ skills }: FooterSoftSkillsProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (skills.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % skills.length);
    }, ROTATE_MS);

    return () => clearInterval(interval);
  }, [skills]);

  if (skills.length === 0) return null;

  return (
    <div
      className="w-full flex justify-center"
      aria-live="polite"
      aria-atomic="true"
    >
      <SplitText
        key={skills[index]}
        text={skills[index]}
        tag="p"
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground"
        delay={35}
        duration={0.55}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 28 }}
        to={{ opacity: 1, y: 0 }}
        textAlign="center"
        immediate
      />
    </div>
  );
}
