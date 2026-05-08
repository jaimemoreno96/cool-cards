import { useState, useCallback, useLayoutEffect } from "react";

export function useResizeObserver() {
  const [element, setElement] = useState<Element | null>(null);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  // useCallback ensures the ref doesn't change on every render
  const ref = useCallback((node: Element) => {
    if (node !== null) {
      setElement(node);
    }
  }, []);

  useLayoutEffect(() => {
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setHeight(entry.contentRect.height);
        setWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(element);

    return () => {
      if (element) {
        resizeObserver.unobserve(element);
      }
    };
  }, [element]);

  return { ref, height, width };
}
