import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function that combines classNames dynamically
// uses twMerge to concatenate classNames
export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(...inputs));
}