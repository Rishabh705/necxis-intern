'use client'

import { useState } from 'react'
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Activities from './Activities';
import {CgProfile} from 'react-icons/cg'

export default function Sidebar({className}) {
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(prev => !prev);
    };

    return (
        <div className={`${className}`}>
            <button onClick={toggleDrawer} className='flex justify-center'>
                <CgProfile size={25} />
            </button>
            <Drawer open={open} onClose={toggleDrawer} anchor='right'>
                <Box sx={{ width: 280 }} role="presentation" onClick={toggleDrawer}>
                    <Activities className='px-6'/>
                </Box>
            </Drawer>
        </div>
    )
}
