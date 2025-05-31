import { useNavigate } from 'react-router-dom';
import errorImg from '../assets/Img/error.webp'
import { useTheme } from '../Hooks/useTheme';
const ErrorPage = () => {
    const navigate=useNavigate()
    const { changeTheme,mode }=useTheme();
    const GoHome = () => {
        navigate('/')
    }
    return (
        <div className="flex flex-col justify-center items-center w-full h-full dark:bg-[#1E2A47]">
            <div className="flex flex-col justify-center items-center gap-3 my-20 dark:bg-[#1E2A47]">
            <img src={errorImg} className='mt-20' alt="" />
            <h1 className="text-3xl">Page Not Found</h1>
            <div>
                    <button onClick={GoHome} className='mb-20 btn w-40 font-bold border border-[#04738C] rounded-full text-[#04738C] hover:text-white hover:bg-[#04738C]'>Go Back</button>
                </div>
        </div>
        </div>
        
    );
};

export default ErrorPage;