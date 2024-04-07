'use client'

import Box from '@mui/joy/Box';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';
import { FaRegComments } from "react-icons/fa";
import { useState } from "react";
import Modal from '@mui/material/Modal';
import { postComment } from '@/lib/actions';
import CommentSection from './CommentSection';


export default function PostComment({ postId }) {
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [italic, setItalic] = useState(false);
    const [fontWeight, setFontWeight] = useState('normal');
    const [anchorEl, setAnchorEl] = useState(null);

    const handleSubmit = postComment.bind(null, postId);

    const handleClick = () => setOpen(prev => !prev);

    return (
        <>
            <button onClick={handleClick}><FaRegComments size={20} /></button>
            <Modal
                open={open}
                onClose={handleClick}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div
                    style={{
                        top: '30%',
                        left: '50%',
                        transform: 'translate(-50%, -30%)',
                        minWidth: '280px',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        padding: '2rem',
                        position: 'relative',
                    }}
                >
                    <form action={handleSubmit}>
                        <Textarea
                            sx={{
                                borderRadius:"10px 10px 0 0",
                                minWidth: 100,
                                fontWeight,
                                fontStyle: italic ? 'italic' : 'initial',
                            }}
                            placeholder="Type something here…"
                            minRows={3}
                            value={comment}
                            name='comment'
                            onChange={(e) => setComment(e.target.value)}
                            endDecorator={
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 'var(--Textarea-paddingBlock)',
                                        pt: 'var(--Textarea-paddingBlock)',
                                        borderTop: '1px solid',
                                        borderColor: 'divider',
                                        flex: 'auto',
                                    }}

                                >
                                    <IconButton
                                        variant="plain"
                                        color="neutral"
                                        onClick={(event) => setAnchorEl(event.currentTarget)}
                                    >
                                        <FormatBold />
                                        <KeyboardArrowDown fontSize="md" />
                                    </IconButton>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={() => setAnchorEl(null)}
                                        size="sm"
                                        placement="bottom-start"
                                        sx={{
                                            position: 'absolute',
                                            '--ListItemDecorator-size': '24px',
                                            zIndex: 1000000,

                                        }}
                                    >
                                        {['200', 'normal', 'bold'].map((weight) => (
                                            <MenuItem
                                                key={weight}
                                                selected={fontWeight === weight}
                                                onClick={() => {
                                                    setFontWeight(weight);
                                                    setAnchorEl(null);
                                                }}
                                                sx={{ fontWeight: weight }}
                                            >
                                                <ListItemDecorator>
                                                    {fontWeight === weight && <Check fontSize="sm" />}
                                                </ListItemDecorator>
                                                {weight === '200' ? 'lighter' : weight}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                    <IconButton
                                        variant={italic ? 'soft' : 'plain'}
                                        color={italic ? 'primary' : 'neutral'}
                                        aria-pressed={italic}
                                        onClick={() => setItalic((bool) => !bool)}
                                    >
                                        <FormatItalic />
                                    </IconButton>
                                    <button className='ml-auto bg-blue-600 text-white py-2 px-4 rounded-lg' type='submit'>Send</button>
                                </Box>
                            }
                        />
                    </form>
                    <CommentSection postId={postId} />
                </div>
            </Modal>
        </>

    )
}
