import { useDarkMode } from "@/app/atom";
import { cn } from "@/utils/cn";

// Function that provides a styled wrapper for content, making it flexible for whatever content is displayed
export const Container = (props: React.HTMLProps<HTMLDivElement>) => {
    // creates access to darkMode for custom darkMode styling
    const [darkMode] = useDarkMode();
    return (
        <div {...props} 
        className = {cn(`${darkMode ? 'bg-slate-200/70 border-slate-300/80' : 'bg-white'} w-full rounded-xl flex py-4 shadow-sm text-black`,
        props.className)}
        />
    )
};