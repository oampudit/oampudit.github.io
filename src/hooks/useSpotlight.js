import { useRef, useCallback } from "react";

/**
 * Tracks cursor inside an element and exposes --mx / --my CSS vars.
 * Use with a wrapper that has the `.spotlight` utility class.
 */
export default function useSpotlight() {
  const ref = useRef(null);

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    el.style.setProperty("--spotlight-opacity", "1");
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--spotlight-opacity", "0");
  }, []);

  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}
