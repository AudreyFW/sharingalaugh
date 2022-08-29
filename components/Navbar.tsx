import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import Router, { useRouter } from 'next/router';
import {AiOutlineLogout} from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import Logo from '../utils/logo.png';
import { createOrGetUser } from '../utils';
import useAuthStore from '../store/authStore';






const Navbar = () => {
  const { userProfile, addUser, removeUser} = useAuthStore();
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();


  const handleSearch=(e:{preventDefault: ()=>void})=>{
    e.preventDefault();
    if(searchValue) {
      router.push(`/search/${searchValue}`)
    }
  }

  return (
    <div className=' bg-black w-full flex justify-between items-center border-b-2 border-gray-400  px-4'>
        <Link href='/'>
        <div className='w-[150px]  md:w-[150px]'>
            <Image
                className='cursor-pointer rounded'
                src={Logo}
                alt='logo of the website'
                layout='responsive'
            />
        </div>
        </Link>

        <div className='relative hidden md:block'>
          <form
            onSubmit={handleSearch}
            className='absolute md:static top-10 left-20 '
          >
            <input 
              type='text'
              value={searchValue}
              onChange={(e)=>setSearchValue(e.target.value)}
              placeholder='Search accounts or videos'
              className='bg-gray-900 p-3 md:text-md text-slate-100 font-medium border-2 border-gray-400 focus:outline-none focus:border-2 focus:border-gray-100 w-[300] md:w-[350px] rounded-full md:top-0 '
            />
            <button
              onClick={handleSearch}
              className='absolute md:right-5 right-6 top-4 border-1-2 border-gray-300 pl-4 text-2xl text-gray-400'
            >
              <BiSearch />
            </button>

          </form>
        </div>

        <div>
          {userProfile?(
            <div className='flex gap-2 md:gap-10'>
              <Link href='/upload'>
                <button className='border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2'>
                  <IoMdAdd className='text-xl text-gray-300'/>
                  <span className='hidden md:block text-gray-400'>Upload</span>
                </button>
              </Link>
              {
                userProfile.image && (
                  <Link href="/">
                  <>
                    <Image
                      width={40}
                      height={40}
                      className="rounded-full cursor-pointer"
                      src={userProfile.image}
                      alt="profile pic"
      
                    />
                  </>
                </Link>
                )
              }
              <button 
                type='button'
                className='px-1 sm:px-2'
                onClick={()=>{
                  googleLogout()
                  removeUser()
                }}
                >
                  <AiOutlineLogout color='white' fontSize={25}  />
              </button>
            </div>
          ):(
            <GoogleLogin
              onSuccess={(response)=> createOrGetUser(response, addUser)}
              onError={()=>console.log('error')}
             />
          )}
        </div>
    </div>
  )
}

export default Navbar