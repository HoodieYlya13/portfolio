import { useEffect, RefObject } from "react";

export function useIntersectionObserver(
  ref: RefObject<HTMLElement | null>,
  selector?: string,
) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-state", "visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    );

    if (selector) {
      const elements = root.querySelectorAll(selector);
      elements.forEach((el) => observer.observe(el));
    } else observer.observe(root);

    return () => observer.disconnect();
  }, [ref, selector]);
}
