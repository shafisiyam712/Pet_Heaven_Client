
import { useContext } from "react";
import { authContext } from "../Components/AuthProvider";


const useAuth = () =>{
    const context = useContext(authContext);
    return context;
}

export default useAuth;