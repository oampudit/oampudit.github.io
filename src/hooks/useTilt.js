import { useRef, useCallback } from "react";

/**
 * Lightweight 3D tilt. Attach the returned `bind` spread to the card element.
 * Updates CSS vars for max performance (no React re-render per mouse-move).
 */
export default function useTilt({ max = 8, scale = 1.02 } = {}) {
  const ref = useRef(null);

  const onMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * max}deg) rotateX(${-y * max}deg) scale(${scale})`;
      el.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
      el.style.setProperty("--my", `${(y + 0.5) * 100}%`);
    },
    [max, scale]
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  }, []);

  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}
