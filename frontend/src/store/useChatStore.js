import { toast } from "react-toastify";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore=create((set,get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,
   

    getUsers:async ()=>{
        set({isUsersLoading:true})

        try {
            const res=await axiosInstance.get("/messages/users");
            set({users:res.data})
        } catch (error) {
            toast.error(error?.response?.data?.messages || error?.error)
        }finally{
            set({isUsersLoading:false})
        }
    },
    getMessages:async (userId)=>{
        set({isMessagesLoading:true})
        try{
            const res=await axiosInstance.get(`/messages/${userId}`);
            set({messages:res.data})
        }catch(error){
            toast.error(error?.response?.data?.messages || error?.error)
        }finally{
            set({isMessagesLoading:false})
        }
    },
    sendMessage:async (data)=>{
        try{
            const {selectedUser,messages}=get();
            const res=await axiosInstance.post(`/messages/send/${selectedUser._id}`,data);
            set({messages:[...messages,res.data]})
        }catch(error){
            toast.error(error?.response?.data?.messages || error?.error)
        }
        
    },
    subscribeToMessages:()=>{
        const {selectedUser}=get();
        if(!selectedUser){
            return;
        }
        const socket=useAuthStore.getState().socket;
        socket.on("newMessage",(newMessage)=>{
            if(newMessage.sender!==selectedUser._id) return
            set({messages:[...get().messages,newMessage]})
        })

    },

    unsubscribeFromMessages:()=>{
        const socket=useAuthStore.getState().socket;
        socket.off("newMessage")
    },

    setSelectedUser:(selectedUser)=>set({selectedUser})
}))