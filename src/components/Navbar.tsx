"use client"

import { IoPartlySunny } from "react-icons/io5";
import { MdMyLocation, MdLocationOn } from "react-icons/md";
import { SearchBox } from "./SearchBox";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { loadingCityAtom, placeAtom, useDarkMode } from "@/app/atom";
import { useTheme } from "next-themes";
import { ThemeSwitch } from "./ThemeSwitch";

// Navbar props
type Props = { location?: string };

// Displays Navbar
export const Navbar = ({ location }: Props) => {
    // Manages the value of the search input field
    const [city, setCity] = useState("");
    // Manages error messages related to search functionality
    const [error, setError] = useState("");
    // Manages suggestions for search input
    const [suggestions, setSuggestions] = useState<string[]>([]);
    // Tracks whether to display search suggestions
    const [showSuggestions, setShowSuggestions] = useState(false);
    // State atom for managing the selected place
    const [place, setPlace] = useAtom(placeAtom);
    // Uses destructuring to ignore first tuple element, and get the setLoadingCity function to update the atom's value
    const [_, setLoadingCity] = useAtom(loadingCityAtom);
    // creates access to darkMode for custom darkMode styling
    const [darkMode] = useDarkMode();

    // Handles changes in the search input field
    const handleInputChange = async (value: string) => {
        setCity(value);
        if (value.length >= 3) {
            // fetches searchbox suggestions once there's more than 3 characters entered
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`);
                const suggestions = response.data.list.map((item: any) => item.name);
                setSuggestions(suggestions);
                setError('');
                setShowSuggestions(true);
                // Catches errors + clears suggestions
            } catch (error) {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }
    // When a user selects a suggestion, this function sets the city state to selected suggestion
    const handleSuggestionClick = (value: string) => {
        setCity(value);
        setShowSuggestions(false);
    }
    // Called when the user submits the search form
    const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
        setLoadingCity(true);
        e.preventDefault();
        // If no suggestions, displays error message
        if (suggestions.length === 0) {
            setError("Location not found");
            setLoadingCity(false);
            // If suggestion is found, error message it empty and city is loaded after 0.5 seconds
        } else {
            setError("");
            setTimeout(() => {
                setLoadingCity(false);
                setPlace(city);
                setShowSuggestions(false);
            }, 500)
        }
    }
    // Called when the user clicks on the current location icon
    const handleCurrentLocation = () => {
        // if browser supports geolocation, it will ask user to allow geolocation
        if (navigator.geolocation) {
            // will generate the coordinates based on user's location
            navigator.geolocation.getCurrentPosition(async(position) => {
                const { latitude, longitude } = position.coords
                // request new coordinate data from weather API + simulates loading time with setTimeout
                try {
                    setLoadingCity(true);
                    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`);
                    setTimeout(() => {
                        setLoadingCity(false);
                        setPlace(response.data.name);
                    }, 500);
                    // displays error
                } catch (error) {
                    setLoadingCity(false);
                }
            })
        }
    }

    return (
    <>
      <nav className={`${darkMode ? 'bg-gray-800/80' : 'bg-white text-black'} shadow-sm sticky top-0 left-0 z-50`}>
        <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
            <p className='flex items-center justify-center gap-2'>
                {/* Weather App Title */}
                <h2 className={`${darkMode ? 'text-white' : 'text-gray-500'} text-3xl`}>Weather</h2>
                <IoPartlySunny className='text-4xl mt-1 text-sky-500' />
            </p>
            <section className='flex gap-2 items-center'>
                <ThemeSwitch />
                {/* Retrieves user's current location when icon is clicked */}
                <MdMyLocation title="Your Current Location"
                onClick={handleCurrentLocation}
                className='text-2xl text-gray-400 hover:opacity-80 cursor-pointer'/>
                {/* Displays location and icon and updates location name based on selected location */}
                <MdLocationOn className={`${darkMode ? 'text-white' : 'text-black'} text-3xl`}/>
                <p className={`${darkMode ? 'text-white' : 'text-slate-900/80'} text-sm`}>{location}</p>
                <div className="relative hidden md:flex">
                    <SearchBox 
                    value={city}
                    onSubmit={handleSubmitSearch}
                    onChange={(e) => handleInputChange(e.target.value)}
                    />
                    {/* Displays search suggestions based on user input */}
                    <SuggestionBox 
                    {...{
                        showSuggestions,
                        suggestions,
                        handleSuggestionClick,
                        error
                    }}
                    />
                </div>
            </section>
        </div>
      </nav>
      {/* Contains mobile view of search input and suggestion box */}
      <section className={`${darkMode ? 'text-white' : 'text-black'} flex flex-col items-center max-w-7xl px-3 md:hidden`}>
      <div className="relative">
                    <SearchBox 
                    value={city}
                    onSubmit={handleSubmitSearch}
                    onChange={(e) => handleInputChange(e.target.value)}
                    />
                    <SuggestionBox 
                    {...{
                        showSuggestions,
                        suggestions,
                        handleSuggestionClick,
                        error
                    }}
                    />
                </div>
            </section>
    </>
    );
};


// Renders a list of suggestions based on the user input
const SuggestionBox = ({ showSuggestions, suggestions, handleSuggestionClick, error}:
     {showSuggestions: boolean;
      suggestions: string[];
      handleSuggestionClick: (item: string) => void;
      error: string;
        }) => {
    // creates access to darkMode for custom darkMode styling
    const [darkMode] = useDarkMode();
    return ( 
    <>{((showSuggestions && suggestions.length > 1) || error) && (
    <ul className={`${darkMode ? 'bg-gray-700 border-gray-700' : 'bg-white'} mb-4 absolute border top-[44px] left-0 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2`}>
        {/* Renders error message if no suggestions */}
        {error && suggestions.length < 1 && ( 
        <li className="text-red-500 p-1">{error}</li>
    )}
    {/* Renders suggestion list */}
    {suggestions.map((item, i) => (
        <li
        key={i}
        onClick={() => handleSuggestionClick(item)}
        className={`${darkMode ? 'text-white hover:bg-gray-400' : 'text-black hover:bg-gray-300'} cursor-pointer p-1 rounded`}
        >{item}</li>
    ))}
        <li className="cursor-pointer p-1 rounded hover:bg-gray-200"></li>
    </ul>
    )}
    </>
    )
}
