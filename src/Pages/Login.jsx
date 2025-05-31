import React from 'react';
import { useContext, useRef, useState } from "react";
import { authContext } from "../Components/AuthProvider";
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaGithub } from 'react-icons/fa';
import Lottie from 'lottie-react';
import loginLottie from '../assets/Lottie/login.json'
import Swal from 'sweetalert2'
import { saveUser } from '../Api/Utils';
const Login = () => {
    const { singInUser, singInWithGoogle,singInWithGithub } = useContext(authContext)
    const navigate = useNavigate()
    const location = useLocation()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const emailRef = useRef();

    const handleLogin = (e) => {

        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        // console.log(email, password);
        setSuccess(false);
        setLoginError('');

        singInUser(email, password)
            .then(result => {
                // console.log(result.user);
                Swal.fire({
                    title: 'Success!',
                    text: 'Login successful!!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
                e.target.reset()
                navigate('/')
                navigate(location.state.from)

            })
            .catch(error => {
                setError({ message: 'User email & password is not valid!!' });
            })

    }
    // const HandleWithGoogle = () => {
    //     singInWithGoogle()
    //         .then(result => {
    //             Swal.fire({
    //                 title: 'Success!',
    //                 text: 'Login successful!!',
    //                 icon: 'success',
    //                 confirmButtonText: 'Ok'
    //             });
    //             navigate('/')
    //             navigate(location.state.from)
    //         })
    // }

    // const HandleWithGithub = () => {
    //     singInWithGithub()
    //         .then(result => {
    //             Swal.fire({
    //                 title: 'Success!',
    //                 text: 'Login successful!!',
    //                 icon: 'success',
    //                 confirmButtonText: 'Ok'
    //             });
    //             navigate('/')
    //             navigate(location.state.from)
    //         })
    // }
    const HandleWithGoogle = async () => {
      //singInWithGoogle()
      try {
        //User Registration using google
        const data = await singInWithGoogle()
        await saveUser(data?.user)
       
        Swal.fire({
          title: 'Success!',
          text: 'Login successful!!',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
         navigate('/')
      } catch (err) {
        console.log(err)
        // toast.error(err?.message)
      }
    }
    
    
    const HandleWithGithub = async() => {
      //singInWithGithub()
      try {
        //User Registration using google
        const data = await singInWithGithub()
        await saveUser(data?.user)
       
        Swal.fire({
          title: 'Success!',
          text: 'Login successful!!',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
         navigate('/')
      } catch (err) {
        //console.log(err)
        
      }
    }

    return (
        <div className="hero  min-h-screen flex flex-col md:flex-row-reverse w-11/12 mx-auto justify-center">
            <div className='w-1/2 md:w-1/3 mt-10 '>
                <Lottie animationData={loginLottie}></Lottie>
            </div>
            <div className="hero-content flex-col lg:flex">
                <div className="text-center lg:text-left">
                    <h1 className="text-[#1E2A47] text-5xl font-bold dark:text-white">Login now!</h1>
                </div>
                <div className="card w-full max-w-sm shrink-0 shadow-2xl dark:bg-white">
                    <form onSubmit={handleLogin} className="card-body ">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' ref={emailRef} placeholder="email" className="input input-bordered text-black" required />
                        </div>

                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type={showPassword ? 'text' : 'password'} name='password' placeholder="password" className="input input-bordered text-black" required />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className='btn btn-xs absolute right-2 top-12'>
                                {
                                    showPassword ? <FaEye></FaEye> :
                                        <FaEyeSlash></FaEyeSlash>
                                }
                            </button>

                            <label className="label">

                                <a href="">Forgot Password? </a>
                            </label>
                        </div>

                        <div className="form-control mt-6">
                            <button className='btn font-bold border border-[#04738C] text-[#04738C] hover:text-white hover:bg-[#04738C]'>Login</button>
                        </div>
                        {error && <p className="text-red-500">{error.message}</p>}
                        <p className='ml-4 mb-4 cursor-pointer dark:text-black'>
                            Don't have an account? please <Link
                                to='/register' className="text-blue-500 hover:underline hover:text-[#1E2A47]">Register</Link>
                        </p>
                    </form>
                    <div className="flex gap-1 justify-center items-center ">
                        <FcGoogle className="h-14 w-14 mb-3"></FcGoogle>
                        <button onClick={HandleWithGoogle} className="btn w-40 rounded-full bg-white text-[#04738C] hover:bg-[#04738C] hover:text-white ">Google Sing In</button>
                    </div>
                    <div className="flex gap-1 justify-center items-center ">
                        <FaGithub className="h-14 w-14 mb-3 dark:text-black"></FaGithub>
                        <button onClick={HandleWithGithub} className="btn w-40 rounded-full bg-white text-[#04738C] hover:bg-[#04738C] hover:text-white ">GitHub Sing In</button>
                       
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Login;