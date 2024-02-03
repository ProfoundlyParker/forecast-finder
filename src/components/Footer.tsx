import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export const Footer = () => {
    return (
    <div className="items-center justify-center flex">
    <FaGithub className="pr-2 text-4xl" />
    <Link className="text-xl"
    href={"https://github.com/ProfoundlyParker/weather-app"}>GitHub Source Code</Link>
    </div>
    )
}