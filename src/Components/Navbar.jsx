import React, { useContext } from 'react';
import { Link, NavLink } from "react-router-dom";
import { authContext } from './AuthProvider';
//import logo from '../assets/logo/logo.png'
import { AiOutlineMenu } from 'react-icons/ai'
import avatarImg from '../assets/Img/placeholder.jpg'
import { useState } from 'react'
const Navbar = () => {  
   const {user,singOutUser}=useContext(authContext)
  const [isOpen, setIsOpen] = useState(false)
    const links=<>
    <li><NavLink to='/'>Home</NavLink></li>
    <li><NavLink to='/DonationCampaigns'>Donation Campaigns</NavLink></li>
    <li><NavLink to='/PetListing'>Pet Listing</NavLink></li>
    <li><NavLink to='/register'>Register</NavLink></li>
    {/* <li><NavLink to='/foodRequest'>My Food Request</NavLink></li> */}
    {/* <li><NavLink to='/about'>About</NavLink></li> */}
   
    </>

const handleSingOut=()=>{
  singOutUser();
  then((result)=>{
    
  })
  .catch(error=>{
   
    
  })
} //bg-[#E75480] #c21760 #db387e
    return (
        <div className="navbar bg-[#c21760]">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              {links}
            </ul>
          </div>
          <div className='flex justify-center items-center'>
            <img className='w-12' src='' alt="" />
          {/* <a className="btn btn-ghost text-xl font-bold text-white">Food Feasta</a> */}
          <h3 className="text-xl font-bold text-white text-center">Food Feasta</h3>
          </div>
          
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
            
          {/* {
            user ? 
            <>
            <div><img src={user.photoURL} alt="User Avatar" className="w-12 h-12 rounded-full" title={user.displayName || 'User'} /></div>
              
              <a onClick={handleSingOut} className="btn ml-2 bg-white text-[#1E2A47] hover:bg-[#1E2A47] hover:text-white">Sign Out</a>
            </> :
            <>
              <button className="btn w-20  bg-white text-[#1E2A47] hover:bg-[#1E2A47] hover:text-white" ><Link to='/login'>Login</Link></button>
              <button className="btn w-20  bg-white text-[#1E2A47] hover:bg-[#1E2A47] hover:text-white" ><Link to='/register'>Register</Link></button>
            </>
          
          } */}

            {/* Dropdown Menu */}
            <div className='relative'>
              <div className='flex flex-row items-center gap-3'>
                {/* Dropdown btn */}
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                >
                  <AiOutlineMenu />
                  <div className='hidden md:block'>
                    {/* Avatar */}
                    <img
                      className='rounded-full'
                      referrerPolicy='no-referrer'
                      src={user && user.photoURL ? user.photoURL : avatarImg }
                      alt='profile'
                      height='40'
                      width='40'
                    />
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm'>
                  <div className='flex flex-col cursor-pointer'>
                    <Link
                      to='/'
                      className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      Home
                    </Link>

                    {user ? (
                      <>
                        <Link
                          to='/dashboard'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Dashboard
                        </Link>
                        <div
                          onClick={handleSingOut}
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to='/login'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Login
                        </Link>
                        <Link
                          to='/register'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
         
        </div>
      </div>
    );
};

export default Navbar;