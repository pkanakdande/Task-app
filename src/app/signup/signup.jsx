"use client";
import React, { useState } from "react";
import signup from "../../assets/signup.svg";
import Image from "next/image";
import { toast } from "react-toastify";
import { SignUpUser } from "@/models/services/userService";
import { useRouter } from "next/navigation";

const Signup = () => {

  const router=useRouter()
  
    const [data,setData]=useState({
        name:'',
        email:"",
        password:"",
        about:"",
        profileUrl:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' 
        
    })

    const doSubmit = async (e) => {
        e.preventDefault();
        if (data.name.trim() === "" || data.name === null){
          toast.warning("Name is required !!");
        } else if(data.password.trim() === "" || data.password === null){
          toast.warning("Password is required !!");
        }
                  
        
        
        try {
          const result = await SignUpUser(data);
          console.log(result);
          toast.success("User registered successfully");
         router.push("/login")
        } catch (error) {
          if (error.response && error.response.status === 409) {
            toast.error("Email already exists");
          } else {
            toast.error("Signup error: " + error.response.data.message);
          }
          console.log(error);
        }
        return;
      };


      const resetForm=()=>{
        setData({
            name:'',
            email:"",
            password:"",
            about:"",
            profileUrl:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' 
            
        })
      }

  return (
    <div className="flex items-center justify-center mt-20 text-white">
      <div className="flex flex-col items-center w-1/3 p-5 -mt-20">
        <Image
          src={signup}
          style={{ width: "80%" }}
          className="mb-5"
          alt="signup-logo"
        />
        <h1 className="text-3xl text-center">Signup here   </h1> <h1 className="text-5xl">&rarr;</h1>
      </div>
      <div className="w-1/3 p-5 -mt-20">
        <form className="flex flex-col " onSubmit={doSubmit}>
          <label className="block font-medium mb-2">UserName</label>
          <input
            type="text"
            name="name"
            placeholder="Your username here"
            className="p-3 mb-4 block w-full bg-gray-500 rounded-2xl shadow-sm focus:ring focus:ring-opacity-75 focus:ring-violet-600 dark:bg-gray-100"
          onChange={(e)=>{
            setData({
                ...data,
                name:e.target.value
            })
          }}
          value={data.name}
          />

          <label className="block font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Your email here"
            className="p-3 mb-4 block w-full bg-gray-500 rounded-2xl shadow-sm focus:ring focus:ring-opacity-75 focus:ring-violet-600 dark:bg-gray-100"
            onChange={(e)=>{
                setData({
                    ...data,
                    email:e.target.value
                })
              }}
              value={data.email}
         />

          <label className="block font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Your password here"
            className="p-3 mb-4 block w-full bg-gray-500 rounded-2xl shadow-sm focus:ring focus:ring-opacity-75 focus:ring-violet-600 dark:bg-gray-100"
            onChange={(e)=>{
                setData({
                    ...data,
                    password:e.target.value
                })
              }}
              value={data.password}
          />

          <label className="block font-medium mb-2">About</label>
          <textarea
            rows={3}
            name="about"
            placeholder="Tell us about yourself"
            className="p-3 mb-4 block w-full rounded-md bg-gray-500 focus:ring focus:ring-opacity-75 focus:ring-violet-600 dark:bg-gray-100"
            onChange={(e)=>{
                setData({
                    ...data,
                    about:e.target.value
                })
              }}
              value={data.about}
          ></textarea>

          <div className="flex space-x-4 justify-center mt-3">
            <button
              type="submit"
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-400 focus:ring hover:ring focus:ring-opacity-75"
            >
              Sign Up
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
        {/* {JSON.stringify(data)} */}
      </div>
    </div>
  );
};

export default Signup;
