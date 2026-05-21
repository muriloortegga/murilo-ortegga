import { useEffect, useRef } from "react";

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide cursor on mobile/touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      if (cursorRef.current) cursorRef.current.style.display = 'none';
      return;
    }

    const el = cursorRef.current;
    if (!el) return;

    const move = (e: MouseEvent) => {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
    };

    const addHover = () => el.classList.add("hovering");
    const removeHover = () => el.classList.remove("hovering");

    document.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, .project-card").forEach((node) => {
      node.addEventListener("mouseenter", addHover);
      node.addEventListener("mouseleave", removeHover);
    });

    return () => {
      document.removeEventListener("mousemove", move);
      document.querySelectorAll("a, button, .project-card").forEach((node) => {
        node.removeEventListener("mouseenter", addHover);
        node.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  return <div ref={cursorRef} className="cursor" />;
}
