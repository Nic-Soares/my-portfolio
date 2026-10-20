import {
  type ComponentType,
  lazy,
  type ReactNode,
  useEffect,
  useState,
} from "react";

// A skeleton that flashes for a few frames reads as a glitch: it only
// appears after SHOW_AFTER and, once shown, stays for at least MIN_VISIBLE
const SHOW_AFTER = 150;
const MIN_VISIBLE = 400;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Resolves either before the skeleton shows or after it has been visible
// for MIN_VISIBLE
export async function withFloor<T>(load: () => Promise<T>): Promise<T> {
  const start = Date.now();
  const result = await load();
  const elapsed = Date.now() - start;
  if (elapsed > SHOW_AFTER && elapsed < SHOW_AFTER + MIN_VISIBLE) {
    await wait(SHOW_AFTER + MIN_VISIBLE - elapsed);
  }
  return result;
}

// React.lazy with that floor on the chunk load
export function lazyWithFloor<T extends ComponentType>(
  load: () => Promise<{ default: T }>,
) {
  return lazy(() => withFloor(load));
}

// Suspense fallback that renders nothing for the first SHOW_AFTER ms
export function DelayedFallback({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), SHOW_AFTER);
    return () => clearTimeout(timer);
  }, []);

  return visible ? children : null;
}
