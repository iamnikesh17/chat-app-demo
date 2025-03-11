import { Eye, EyeOff, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthImagePattern } from "../components/main";
import {  useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

export const RegisterPage = () => {
    const [formData,setFormData]=useState({
        fullname:"",
        email:"",
        password:""
    })

    const {signUp,isSigningUp}=useAuthStore();

    const [error,setError]=useState({});

    const handleChange=(e)=>{
        const {name,value}=e.target
        setFormData((prev)=>({
             ...prev,
              [name]:value
        }))
        setError({...error,[e.target.name]:''})
    }
    
    const validateForm=()=>{
        let errors={}
        if(!formData.fullname){
            errors.fullname="Full Name is required"
        }
        if(!formData.email){
            errors.email="Email is required"
        }
        if(!formData.password){
            errors.password="Password is required"
        }

        return errors;


    }
    



   

    const handleSubmit=async (e)=>{
        e.preventDefault();

        const validationErrors=validateForm();
        if(Object.keys(validationErrors).length>0){
            setError(validationErrors);
        }
        else{
            // Send form data to server
            // Handle success or error response
            await signUp(formData);

        }
    }





  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="input input-bordered w-full pl-10"
                  placeholder="John Doe"
                />
                {
                    error.fullname && (
                      <p className="text-red-500 text-xs">{error.fullname}</p>
                    )
                }
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
                {
                    error.email && (
                      <p className="text-red-500 text-xs">{error.email}</p>
                    )
  
                }
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type="password"
                  className="input input-bordered w-full pl-10"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
             
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <EyeOff className="size-5 text-base-content/40" />
                </button>
                {
                    error.password && (
                      <p className="text-red-500 text-xs">{error.password}</p>
                    )
                }
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Create Account
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

    <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      /> 

    
    </div>
  );
};


