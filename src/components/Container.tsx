import { useDarkMode } from "@/app/atom";
import { cn } from "@/utils/cn";

// Function that provides a styled wrapper for content, making it flexible for whatever content is displayed
export const Container = (props: React.HTMLProps<HTMLDivElement>) => {
    // creates access to darkMode for custom darkMode styling
    const [darkMode] = useDarkMode();
    return (
        <div {...props} 
        className = {cn(`${darkMode ? 'bg-gray-400 border-gray-400' : 'bg-white'} w-full border rounded-xl flex py-4 shadow-sm`,
        props.className)}
        />
    )
};