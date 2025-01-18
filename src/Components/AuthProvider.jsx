import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/FirebaseInt";

//import axios from "axios";

export const authContext=createContext(null)

const AuthProvider = ({children}) => {
    const provider=new GoogleAuthProvider()
    const githubProvider=new GithubAuthProvider();
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)

    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const singInUser=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    
    const singInWithGoogle=()=>{
        return signInWithPopup(auth,provider)
    }
    const singInWithGithub=()=>{
        return signInWithPopup(auth,githubProvider)
    }

    const manageProfile = (name,image) =>{
        return updateProfile(auth.currentUser,{
             displayName:name,photoURL:image
         })
       }
    const singOutUser=()=>{
        setLoading(true)
        return signOut(auth)
    }
    
    useEffect(()=>{
        const unSubscribe=onAuthStateChanged(auth,currentUser=>{
            // console.log("currently logged",currentUser);
             setUser(currentUser)  
             setLoading(false)
             
             
        })
        return()=>{
            unSubscribe()
        }
    } ,[])

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, currentUser => {
    //         setUser(currentUser)
    //         console.log('state captured', currentUser?.email);
    //         if (currentUser?.email) {
    //             const user = { email: currentUser.email };
    //             axios.post('https://mileston-11-server-side.vercel.app/jwt', user, { withCredentials: true })
    //                 .then(res => {
    //                     console.log('login token', res.data);
    //                     setLoading(false);
    //                 })
    //         }
    //         else {
    //             axios.post('https://mileston-11-server-side.vercel.app/logout', {}, {
    //                 withCredentials: true
    //             })
    //             .then(res => {
    //                 console.log('logout', res.data);
    //                 setLoading(false);
    //             })
    //         }
    //     })
    //     return () => {
    //         unsubscribe();
    //     }
    // }, [])

    const authMember={
        loading,
        createUser,
        singInUser,
        singOutUser,
        singInWithGoogle,
        singInWithGithub,
        manageProfile,
        user,
    }

    return (
        <authContext.Provider value={authMember}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;