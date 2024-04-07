import { LuLogOut } from "react-icons/lu"
import { logout } from '@/lib/actions';
import { BsFillPostcardHeartFill } from "react-icons/bs";
import { FaComments } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";

export default function Activities({className}) {
    return (
        <div className={`py-10 ${className}`}>
            <h2 className='md:hidden mb-4 pb-2 text-lg font-medium border-b-2'>Menu</h2>
            <ul>
                <li className='flex items-center gap-4 font-medium hover:bg-slate-200 pt-2 pb-2'>
                    <BsFillPostcardHeartFill />
                    My Posts
                </li>
                <li className='flex items-center gap-4 font-medium hover:bg-slate-200 pt-2 pb-2'>
                    <FaComments />
                    My Comments
                </li>
                <li className='flex items-center gap-4 font-medium hover:bg-slate-200 pt-2 pb-2'>
                    <BiSolidLike />
                    Liked Posts
                </li>
                <li>
                    <form action={logout}>
                        <button className='flex items-center gap-4 font-medium w-full hover:bg-slate-200 pt-2 pb-2'>
                            <LuLogOut />
                            Logout
                        </button>
                    </form>
                </li>
            </ul>
        </div>
    )
}  
