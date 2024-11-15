import axios from "axios";
import { createContext,ReactNode, useContext, useEffect, useState } from "react";
import {   useNavigate } from "react-router-dom";
import { BACKEND_URI } from "../constant";
import { toast } from "react-toastify";

export interface User {
            name:string
            email:string
            id:string
}

interface MainContextProps{
    user:User,
    loading:boolean,
    
    loginUser:(email:string,password:string)=>void,
    registerUser:(name:string,email:string,password:string)=>void,
    logoutButton:()=>void
}

export const MainContext = createContext<MainContextProps>({
    user:{
        email:'',
        name:'',
        id:''
    },
    loginUser:()=>{},
    logoutButton:()=>{},
    registerUser:()=>{},
    loading:true

});


export const useMainContext = ()=>useContext(MainContext);


export const MainContextProvider = ({children}:{children:ReactNode})=>{

    const navigate = useNavigate() 
    const [loading,setLoading] = useState(true)
    const [user,setUser] = useState<User>({
        email:'',
        name:'',
        id:''
    })



    // register user

    const registerUser=async(name:string,email:string,password:string)=>{
        // logic

            
                
            try {
                const res = await axios.post(BACKEND_URI+"/register-user",{
                    name,
                    email,
                    password
                })
                const data = await res.data;
                if(data.error){ 
                    
                    throw new Error(data.error);
                    return
                }
                // console.log(data);
                localStorage.setItem("token",data.token);
                toast.success(data.succes)
                await fetchUser()

                navigate("/")
            } catch (error:any) {
                toast.error(error.response.data.error);
                
            }
    }

    const logoutButton =()=>{
        localStorage.removeItem("token")
        toast.success("logout success")
        setUser({
            email:'',
            name:'',
            id:''
        })
        navigate("/login",{viewTransition:true})
    }


    const fetchUser =async()=>{ 
                const token  = localStorage.getItem("token") || ''
                
                try {
                    if(!token) return
            const res = await axios.get(BACKEND_URI+"/profile",{
                headers:{
                    'Authorization':'Bearer '+ localStorage.getItem("token")
                }
            })
            const data = await res.data;
            setUser(data);
            
        } catch (error:any) {
            toast.error(error.response.data.error);
            
        }finally{
            setLoading(false)
        }

    }

    useEffect(()=>{fetchUser()}, [])

    const loginUser=async(email:string,password:string)=>{
        // logic

            
                
            try {
                const res = await axios.post(BACKEND_URI+"/login-user",{ 
                    email,
                    password
                })
                const data = await res.data;
                if(data.error){ 
                    
                    throw new Error(data.error);
                    return
                }
                console.log(data);
                localStorage.setItem("token",data.token);
                toast.success(data.msg)
                await fetchUser()
                navigate("/")

            } catch (error:any) {
                toast.error(error.response.data.error);
                
            }
    }
    return <MainContext.Provider value={{user,registerUser,loading,logoutButton,loginUser}}>
      {loading?'loading...':  children}
    </MainContext.Provider>
}
