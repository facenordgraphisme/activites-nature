export type Activity = "rafting" | "canyoning";

export const ACTIVITIES: Activity[] = ["rafting", "canyoning"];

export const isActivity = (value: string | undefined | null): value is Activity =>
  value === "rafting" || value === "canyoning";

export const otherActivity = (activity: Activity): Activity =>
  activity === "rafting" ? "canyoning" : "rafting";
