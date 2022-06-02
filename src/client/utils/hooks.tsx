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

export const useDimensions = ({ liveMeasure = true }: UseDimensionsArgs = {}): UseDimensionsHook => {
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

// from: https://usehooks.com/useLocalStorage/
export const useLocalStorage = (key, initialValue) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
};
