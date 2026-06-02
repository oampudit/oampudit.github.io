import { useRef, useCallback } from "react";

/**
 * Magnetic pull toward the cursor — subtle attraction within the element bounds.
 */
export default function useMagnetic({ strength = 0.3 } = {}) {
  const ref = useRef(null);

  const onMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      el.style.transform = `translate(${x}px, ${y}px)`;
    },
    [strength]
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  }, []);

  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}
