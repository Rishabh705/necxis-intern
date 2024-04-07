import Link from "next/link"
import { auth } from "@/lib/auth";
// import { getFavs } from "@/lib/actions";
import Sidebar from "./Sidebar";
import Button from '@mui/material/Button';
import Activities from "./Activities";


export default async function Profile({className}) {
    const session = await auth()
    // const results = session?.user ? (await getFavs(session.user.name)).results : []

    return (
        <div className="md:w-full">
            {
                session?.user ? (
                    <>
                        <Activities className='hidden md:block'/>
                        <Sidebar className={className}/>
                    </>
                ) : (
                    <Button variant="contained">
                        <Link href='/login'>Log in</Link>
                    </Button>
                )
            }
        </div>
    )
}
