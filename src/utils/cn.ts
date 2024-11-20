import { type ClassValue, clsx } from "clsx"; // clsx的作用是合并类名
import { twMerge } from "tailwind-merge"; //此插件的作用是合并Tailwind CSS的类名
export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(...inputs))
}; // cn是一个函数，用于合并类名