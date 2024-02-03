import { cn } from "@/utils/cn";

// Function that provides a styled wrapper for content, making it flexible for whatever content is displayed
export const Container = (props: React.HTMLProps<HTMLDivElement>) => {
    return (
        <div {...props} 
        className = {cn("w-full bg-white border rounded-xl flex py-4 shadow-sm",
        props.className)}
        />
    )
};