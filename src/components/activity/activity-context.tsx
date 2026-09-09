"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Activity } from "@/lib/activity";

export type ActivityOrigin = { x: number; y: number } | null;

/** Imperative hook a mounted ActivityThemeLayer registers so the provider can drive its wipe animation. */
type LayerHandler = (next: Activity, origin: ActivityOrigin) => void;

type ActivityContextValue = {
  activity: Activity;
  setActivity: (next: Activity, origin?: ActivityOrigin) => void;
  registerLayer: (handler: LayerHandler | null) => void;
};

const ActivityContext = createContext<ActivityContextValue | null>(null);

export function ActivityProvider({
  initialActivity,
  children,
}: {
  initialActivity: Activity;
  children: ReactNode;
}) {
  const [activity, setActivityState] = useState<Activity>(initialActivity);
  const layerHandler = useRef<LayerHandler | null>(null);

  const registerLayer = useCallback((handler: LayerHandler | null) => {
    layerHandler.current = handler;
  }, []);

  const setActivity = useCallback(
    (next: Activity, origin: ActivityOrigin = null) => {
      setActivityState((current) => {
        if (current === next) return current;
        if (typeof document !== "undefined") {
          document.documentElement.dataset.activity = next;
        }
        return next;
      });
      layerHandler.current?.(next, origin);
    },
    [],
  );

  const value = useMemo(
    () => ({ activity, setActivity, registerLayer }),
    [activity, setActivity, registerLayer],
  );

  return (
    <ActivityContext.Provider value={value}>{children}</ActivityContext.Provider>
  );
}

export function useActivity() {
  const ctx = useContext(ActivityContext);
  if (!ctx) throw new Error("useActivity must be used within ActivityProvider");
  return ctx;
}
