import { useDarkMode } from "@/app/atom";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

// Footer component that displays GitHub icon and Link to source code
export const Footer = () => {
    // creates access to darkMode for custom darkMode styling
    const [darkMode] = useDarkMode();
    return (
    <div className={`${darkMode ? 'text-gray-100' : 'text-black'} items-center justify-center flex`}>
    <Link className="text-xl flex items-center"
    href={"https://github.com/ProfoundlyParker/weather-app"}>
        <span className="pr-2">
        <FaGithub className="text-4xl" />
        </span>
         GitHub Source Code
        </Link>
    </div>
    )
}