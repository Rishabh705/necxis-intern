import Link from 'next/link'
import { FaInstagram } from "react-icons/fa";
import Profile from './Profile'
const Header = () => {
  return (
    <header className='relative bg-white h-16 md:h-full w-full md:min-w-[200px] md:w-1/5 py-4 px-5 md:px-4 lg:px-6'>
      <div className='flex flex-row h-full w-full items-center md:items-start justify-between md:flex-col'>
        <div className='flex lg:ml-0'>
          <Link href='/'>
            <FaInstagram size={30} color='#f329e5' />
          </Link>
        </div>
        <Profile className='md:hidden'/>
      </div>
    </header>
  )
}

export default Header