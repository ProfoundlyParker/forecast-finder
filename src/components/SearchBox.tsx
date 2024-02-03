import { cn } from '@/utils/cn';
import { useState } from 'react';
import { HiSearch } from "react-icons/hi";

type Props = {
    className?: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>|undefined;
    onSubmit: React.FormEventHandler<HTMLFormElement>|undefined;
}

export const SearchBox: React.FC<Props> = (props: Props) => {
    const [searchValue, setSearchValue] = useState('');
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onSubmit?.(event);
        setSearchValue('');
    }
    return (
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
            className="px-4 py-2 w-[230px] border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 h-full"/>
            <button type="submit" className="px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600 h-full">
             <HiSearch />
            </button>
        </form>
    )
}