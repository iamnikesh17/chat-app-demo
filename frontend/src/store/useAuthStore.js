import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import {io} from "socket.io-client";
const BASE_URL=import.meta.env.MODE=="development"?"http://localhost:8080":"/"
export const useAuthStore=create((set,get)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,

    isCheckingAuth:true,
    onlineUsers:[],
    socket:null,

    checkAuth:async ()=>{
        try{

            const res=await axiosInstance.get("/users/check");
            set({authUser:res.data})
            get().connectSocket()

        }catch(error){
            // console.log(error);
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },
    signUp:async (data)=>{
        try{
            set({isSigningUp:true})
            const res=await axiosInstance.post("/users",data);
            set({authUser:res.data})
            toast.success("user registered succesfully")
            get().connectSocket()
        }catch(error){
            console.log(error?.response?.data?.message || error?.error)
            toast.error(error?.response?.data?.message  || error?.error)
        }finally{
            set({isSigningUp:false})
        }
    },
    logout:async ()=>{
        try{
            await axiosInstance.post("/users/logout");
            set({authUser:null})
            toast.success("User logged out successfully")
            get().disconnectSocket()
        }catch(error){
            toast.error(error?.response?.data?.message || error?.error)
        }
    },
    login:async (data)=>{
        try{
            set({isLoggingIn:true})
            const res=await axiosInstance.post("/users/login",data);
            set({authUser:res.data});
            toast.success("User logged in successfully")
            get().connectSocket()
        }catch(error){
            console.log(error?.response?.data?.message || error?.error)
            toast.error(error?.response?.data?.message  || error?.error)
            set({isLoggingIn:false})
        }finally{
            set({isLoggingIn:false})
        }
    },
    updateProfile:async (data)=>{
        try{
            set({isUpdatingProfile:true});
            const res=await axiosInstance.put("/users/update-profile",data);
            set({authUser:res.data});
            toast.success("profile updated succesfully")
        }catch(error){
            toast.error(error?.response?.data?.message || error?.error)
        }finally{
            set({isUpdatingProfile:false})
        }
    },
connectSocket: () => {
    const { authUser, socket } = get();  // Get both authUser and socket from the state
    if (!authUser || (socket && socket.connected)) {
        return;
    }

    const newSocket = io(BASE_URL,{
        query:{
            userId:authUser._id,
        }
    });  // Create a new socket instance
    newSocket.connect();             // Connect the socket
    set({ socket: newSocket });      // Set the new socket in the store

    socket.on("getOnlineUsers",(userIds)=>{
        set({onlineUsers:userIds})
    })
},

disconnectSocket:()=>{
    const {socket}=get();
    if(socket && socket.connected){
        socket.disconnect()
    }
}

}));



