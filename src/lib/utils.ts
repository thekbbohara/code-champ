import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function excludeFields<
  T extends Record<string, unknown>,
  Key extends keyof T,
>(model: T, keys: Key[]): Omit<T, Key> {
  const entries = Object.entries(model) as [keyof T, T[keyof T]][];
  // Filter out the excluded keys
  const filteredEntries = entries.filter(([key]) => !keys.includes(key as Key));
  // Convert the filtered entries back to an object
  return Object.fromEntries(filteredEntries) as Omit<T, Key>;
}
