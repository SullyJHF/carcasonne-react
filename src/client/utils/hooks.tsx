import { useCallback, useLayoutEffect, useState } from 'react';

export interface DimensionObject {
  width: number;
  height: number;
  top: number;
  left: number;
  x: number;
  y: number;
  right: number;
  bottom: number;
}

export type UseDimensionsHook = [
  (node: HTMLDivElement) => void,
  Record<string, never> | DimensionObject,
  HTMLDivElement | null,
];

export interface UseDimensionsArgs {
  liveMeasure?: boolean;
}

function getDimensionObject(node: HTMLDivElement): DimensionObject {
  const rect = node.getBoundingClientRect();

  return {
    width: rect.width,
    height: rect.height,
    top: 'x' in rect ? rect.x : rect.top,
    left: 'y' in rect ? rect.y : rect.left,
    x: 'x' in rect ? rect.x : rect.left,
    y: 'y' in rect ? rect.y : rect.top,
    right: rect.right,
    bottom: rect.bottom,
  };
}

const useDimensions = ({ liveMeasure = true }: UseDimensionsArgs = {}): UseDimensionsHook => {
  const [dimensions, setDimensions] = useState({});
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  const ref = useCallback((n) => {
    setNode(n);
  }, []);

  useLayoutEffect(() => {
    if (node) {
      const measure = () => window.requestAnimationFrame(() => setDimensions(getDimensionObject(node)));
      measure();

      if (liveMeasure) {
        window.addEventListener('resize', measure);
        window.addEventListener('scroll', measure);

        return () => {
          window.removeEventListener('resize', measure);
          window.removeEventListener('scroll', measure);
        };
      }
    }
  }, [node]);

  return [ref, dimensions, node];
};

export default useDimensions;
