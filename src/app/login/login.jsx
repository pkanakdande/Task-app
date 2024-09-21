"use client"

import React, { useContext, useState } from 'react'
import loginsvg from "../../assets/login.svg"
import Image from 'next/image'
import { toast } from 'react-toastify'
import { login } from '@/models/services/userService'
import { useRouter } from 'next/navigation'
import userContext from '@/context/userContext'
import UserContext from '@/context/userContext'

const LoginPage = () => {

  const router=useRouter()
  const context=useContext(UserContext)
 const [loggin,setLoggin]=useState({
     email:'',
     password:''
 })


    const resetForm=()=>{
        setLoggin({
            
            email:"",
            password:"",
               
        })
      }

      const loginSubmit=async(e)=>{
        e.preventDefault();
         if(loggin.email.trim() === "" || loggin.password === "")
            {
                toast.info("Invalid user data !!")
            }
      try{
        const result = await login(loggin);
        console.log(result);
        toast.success("Logged in successfully");
        context.setUser(result.user)
        router.push("/profile/user")
  }
  catch(error){
    toast.error(error.response.data.message)
    console.log(error);
  }
      }

  return (
    <div className="flex items-center justify-center mt-40 text-white  ">
    <div className="flex flex-col items-center w-1/3 p-10 -mt-20">
      <Image
        src={loginsvg}
        style={{ width: "80%" }}
        className="mb-5"
        alt="signup-logo"
      />
      <h1 className="text-3xl text-center">Login here  </h1> <h1 className="text-5xl">&rarr;</h1>
    </div>
    <div className="w-1/3 p-5 -mt-20">
      <form className="flex flex-col " method='post' onSubmit={loginSubmit} >
      
        <label className="block font-medium mb-2">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Your email here"
          className="p-3 mb-4 block w-full bg-gray-500 rounded-2xl shadow-sm focus:ring focus:ring-opacity-75 focus:ring-violet-600 dark:bg-gray-100"
          onChange={(e)=>{
              setLoggin({
                  ...loggin,
                  email:e.target.value
              })
            }}
            value={loggin.email}
       />

        <label className="block font-medium mb-2">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Your password here"
          className="p-3 mb-4 block w-full bg-gray-500 rounded-2xl shadow-sm focus:ring focus:ring-opacity-75 focus:ring-violet-600 dark:bg-gray-100"
          onChange={(e)=>{
              setLoggin({
                  ...loggin,
                  password:e.target.value
              })
            }}
            value={loggin.password}
        />
        <div className="flex space-x-4 justify-center mt-3">
            <button
              type="submit"
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-400 focus:ring hover:ring focus:ring-opacity-75"
            >
              Log in
            </button>
            <button
            onClick={resetForm}
              type="reset"
              className="bg-orange-600 px-4 py-2 rounded hover:bg-orange-500 focus:ring hover:ring focus:ring-opacity-75"
            >
              Reset
            </button>
          </div>
</form>
</div>
</div>
  )
}

export default LoginPage