import React from 'react';
import { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaGithub } from 'react-icons/fa';
import { authContext } from '../Components/AuthProvider';
import Lottie from 'lottie-react';
import registerLottie from '../assets/Lottie/register.json'
import Swal from 'sweetalert2'
import { imageUpload, saveUser } from '../Api/Utils';
const Register = () => {
  const { createUser, updateUserProfile, singInWithGoogle, singInWithGithub } = useContext(authContext)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const handleRegister =async (e) => {
    setError("")
    e.preventDefault();
    const name = e.target.name.value
    const email = e.target.email.value
    const password = e.target.password.value
    const image = e.target.image.files[0]

    //  console.log(name,email,password,image);
    if (password.length < 6) {
      setError("Password must contain at least 6 characters")
      return
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter")
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter")
      return;
    }
    //1. send image data to imgbb
    const photoURL = await imageUpload(image)

    try {
      //2. User Registration
      const result = await createUser(email, password)

      //3. Save username & profile photo
      await updateUserProfile(name, photoURL)
      console.log(result)
      // save user info in db if the user is new
      await saveUser({ ...result?.user, displayName: name, photoURL })
      Swal.fire({
        title: 'Success!',
        text: 'Registration successful!!',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      navigate('/')
    } catch (err) {
      console.log(err)
      if (ero.message.includes('auth/email-already-in-use')) {
        setError('User already in use');
      } else {
        setError('An error occurred. Please try again latter');
      }
    }
  }



const HandleWithGoogle = async () => {
  //singInWithGoogle()
  try {
    //User Registration using google
    const data = await singInWithGoogle()
    await saveUser(data?.user)
   // console.log(data.user);
    Swal.fire({
      title: 'Success!',
      text: 'Registration successful!!',
      icon: 'success',
      confirmButtonText: 'Ok'
    });
     navigate('/')
  } catch (err) {
    console.log(err)
    //toast.error(err?.message)
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
      text: 'Registration successful!!',
      icon: 'success',
      confirmButtonText: 'Ok'
    });
     navigate('/')
  } catch (err) {
    console.log(err)
    
  }
  
}

return (
  <div className="hero min-h-screen flex flex-col md:flex-row-reverse w-11/12 mx-auto justify-center ">
    <div className='w-1/2 md:w-1/3 mt-5'>
      <Lottie animationData={registerLottie}></Lottie>
    </div>
    <div className="hero-content flex-col lg:flex ">
      <div className="text-center lg:text-left">
        <h1 className="text-[#1E2A47] text-5xl font-bold dark:text-white">Register now!</h1>
      </div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleRegister} className="card-body ">

          <div className="form-control">
            <label className="label">
              <span className="label-text text-black">Name</span>
            </label>
            <input type="text" name='name' placeholder="Name" className="input input-bordered text-black" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text  text-black">Email</span>
            </label>
            <input type="email" name='email' placeholder="email" className="input input-bordered  text-black" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text  text-black">Select Image</span>
            </label>
            {/* <input type="text" name='image' placeholder="url" className="input input-bordered  text-black" required /> */}
            <input
                required
                type='file'
                id='image'
                name='image'
                accept='image/*'
              />
          </div>

          <div className="form-control relative">
            <label className="label">
              <span className="label-text  text-black">Password</span>
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

          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="form-control mt-6">
            <button className='btn font-bold border border-[#04738C]  text-[#04738C] hover:text-white hover:bg-[#04738C]'>Register</button>
          </div>
          <p className='ml-4 mb-1 cursor-pointer dark:text-black'>
            Already have an account? please <Link to='/login' className="text-blue-500 hover:underline hover:text-[#1E2A47]">Login</Link>
          </p>
        </form>

        <div className="flex gap-1 justify-center items-center">
          <FcGoogle className="h-12 w-12 mb-2"></FcGoogle>
          <button onClick={HandleWithGoogle} className="btn w-40 rounded-full bg-white text-[#04738C] hover:bg-[#04738C] hover:text-white ">Google Sing In</button>
        </div>
           <div className="flex gap-1 justify-center items-center ">
        <FaGithub className="h-12 w-12 mb-2 dark:text-black"></FaGithub>
        <button onClick={HandleWithGithub} className="btn w-40 rounded-full bg-white text-[#04738C] hover:bg-[#04738C] hover:text-white ">GitHub Sing In</button>
        
      </div>
      </div>
     
    </div>
  </div>
);
}
export default Register;