'use client'
import { useState } from 'react'
import { like, unlike } from "@/lib/actions"
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useRouter } from "next/navigation";

export default function Like({ id, isFav, user }) {
    const [fav, setFav] = useState(isFav);
    const router = useRouter();
    const handleFavorite = async (e) => {
        e.preventDefault();

        //if user is logged in, like post else redirect to login
        if (user) {
            setFav((prev) => !prev);

            //if post is already liked, unlike it else like it
            if (fav) {
                const res = await unlike(id);
                if (!res.success) {
                    console.error(res.msg);
                    return;
                }
            }
            else {
                const res = await like(id);
                if (!res.success) {
                    console.error(res.msg);
                    return;
                }
            }
        } else {
            router.push('/login');
        }
        router.refresh();
    };
    return (
        <span onClick={(e) => handleFavorite(e)}>
            {fav ? (
                <FaHeart color="red" size={20} />
            ) : (
                <FaRegHeart size={20} />
            )}
        </span>
    )
}
