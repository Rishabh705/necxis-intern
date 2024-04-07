'use client'

import { useRouter } from "next/navigation"
import { useState } from "react";

const SearchBox = () => {
    const [text, setText] = useState('');
    // const searchQuery = new URLSearchParams(location.search);

    const handleChange = (evt) => {
        setText(evt.target.value);
    }

    // const handleNext = () => {
    //     if (text.trim() !== '') {
    //         searchQuery.set('sq', text);
    //         navigate(`${location.pathname}search/?${searchQuery.toString()}`);
    //     }
    // }
    const handleKeyDown = (evt) => {
        if (evt.key === 'Enter') {
            handleNext();
        }
    }


    return (
        <div className='md:mx-0 w-4/5 max-w-[400px] md:w-[350px] '> 
            <div className="relative flex flex-wrap items-stretch">
                <input
                    type="search"
                    name='text'
                    onChange={handleChange}
                    className="relative m-0 -mr-0.5 block min-w-0 flex-auto rounded-full bg-clip-padding px-5 py-[0.25rem] text-md font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-400 dark:focus:border-primary"
                    placeholder="Find latest posts..."
                    aria-label="Search"
                    aria-describedby="button-addon1" />
            </div>
        </div>
    )
}

export default SearchBox