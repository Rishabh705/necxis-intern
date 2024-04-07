'use client'

import { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { post } from '@/lib/actions';
import { useFormState, useFormStatus } from 'react-dom';
import { FiPlusCircle } from "react-icons/fi";


const style = {
    position: 'absolute',
    borderRadius: '10px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 250,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
};

export default function Create() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ caption: '', image: '' });
    const [errorMessage, dispatch] = useFormState(post, undefined);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleClick = () => setOpen(prev => !prev);

    return (
        <>
            <button onClick={handleClick} type="button" className="hidden md:block text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2">
                Create Post
            </button>
            <button onClick={handleClick} className="md:hidden">
                <FiPlusCircle size={30} />
            </button>
            <Modal
                open={open}
                onClose={handleClick}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form action={dispatch}>
                        <div className="mb-6">
                            <label htmlFor="caption" className="block mb-2 text-sm font-medium text-gray-900 ">Enter Caption</label>
                            <input type="text" id="caption" name='caption' className="bg-gray-50 border border-gray-300 placeholder-gray-400 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="This is a beautiful image." value={formData.caption} onChange={handleChange} required />
                        </div>

                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input">Upload file</label>
                            <input className="block p-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none placeholder-gray-400" id="file_input" type="file" name='image' value={formData.image} onChange={handleChange} />
                        </div>

                        <PostButton />

                        {errorMessage && (
                            <div
                                className="flex h-8 items-end justify-center space-x-1"
                                aria-live="polite"
                                aria-atomic="true"
                            >
                                <p className={`text-sm ${errorMessage.success ? "text-green-500" : "text-red-500"}`}>{errorMessage.msg}</p>
                            </div>
                        )}
                    </form>
                </Box>
            </Modal>
        </>
    )
}


function PostButton() {
    const { pending } = useFormStatus();

    return (
        <button aria-disabled={pending} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 focus:outline-none">
            Post
        </button>

    );
}