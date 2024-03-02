import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const compose =
  <T>(...fns: Array<(a: T) => T>) =>
  (x: T) =>
    fns.reduceRight((acc, fn) => fn(acc), x);

export const exportToJson = <T>(objectData: T, filename: string) => {
  const blob = new Blob([JSON.stringify(objectData)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
