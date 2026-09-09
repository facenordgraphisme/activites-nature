import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/** True only after the client has hydrated — safe for portals that must match SSR on first paint. */
export function useHasMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
