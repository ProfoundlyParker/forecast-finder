import { useDarkMode } from '@/app/atom';
import { cn } from '@/utils/cn';
import { useState } from 'react';
import { HiSearch } from "react-icons/hi";

// SearchBox component props
type Props = {
    className?: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>|undefined;
    onSubmit: React.FormEventHandler<HTMLFormElement>|undefined;
}

export const SearchBox: React.FC<Props> = (props: Props) => {
    // Initializes searchbox value with empty string
    const [searchValue, setSearchValue] = useState('');
    // creates access to darkMode for custom darkMode styling
    const [darkMode] = useDarkMode();
    // Clears search box after submitting + allows enter key to submit form
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onSubmit?.(event);
        setSearchValue('');
    }
    return (
        // Displays search form
        <form onSubmit={handleSubmit}
        className={cn(
            "flex relative items-center justify-center h-10 ",
             props.className
             )}>
            <input 
            type="text"
            value={searchValue}
            onChange={(e) => {
                setSearchValue(e.target.value);
                props.onChange?.(e);
            }} 
            placeholder="Search location" 
            className={`${darkMode ? 'bg-slate-300/70 border-slate-300/70' : 'bg-white'} placeholder-gray-900 px-4 py-2 w-[230px] border rounded-l-md focus:outline-none focus:border-blue-500 h-full`}/>
            <button type="submit" className={`${darkMode ? 'bg-sky-600 hover:bg-sky-700' : 'bg-sky-400 hover:bg-sky-500'} px-4 py-[9px] text-white rounded-r-md focus:outline-none h-full`}>
             <HiSearch />
            </button>
        </form>
    )
}