import Link from "next/link"
import Like from "./Like";
import CloudinaryImg from "./CloudinaryImg";
import PostComment from "./PostComment";

export default async function Cards({ post, id,isFav, user }) {
    return (
        <div className="w-full aspect-auto mb-3 break-inside-avoid rounded-lg bg-white border border-gray-200 shadow">
            <Link href="/">
                {
                    post.image &&
                    <CloudinaryImg
                    src={post.image}
                    />
                }
                <div className="px-5 pt-2">
                    <p className="mb-3 font-normal text-gray-700 break-all">{post.caption}</p>
                </div>
            </Link>
            <div className="flex items-center gap-3 px-5 pb-2">
                <Like id={id} isFav={isFav} user={user}/>
                {
                    user?.email &&
                    <PostComment postId={id}/>
                }
            </div>
        </div>
    )
}
