"use client"


import UserContext from '@/context/userContext'
import userContext from '@/context/userContext'
import { logoutUser } from '@/models/services/userService'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import { toast } from 'react-toastify'

const CustomNavbar = () => {
const router=useRouter()
const context=useContext(UserContext)
console.log(context)

 async function doLogout(){
 try {
      const result=await logoutUser()
      console.log(result);
      context.setUser(undefined)
      router.push("/login")
 } catch (error) {
    console.log(error);
    toast.error("logout error")
 }
  }

  return (
    <nav className='bg-blue-600 px-9 py-2 h-14 flex justify-between text-white items-center'>
<div>
    <h1 className='text-2xl font-bold'>
        <Link href='/'><h1>Work Flow</h1> </Link>
    </h1>
</div>
<div>
<ul className='flex space-x-7'>
  {
    context.user && (
        <>
        <li><Link href='/' className='hover:text-blue-300'>Home</Link> </li>
          <li><Link href='/profile/user' className='hover:text-blue-300'>Tasks</Link> </li>
    <li><Link href='/add-task' className='hover:text-blue-300'>Add Task</Link> </li>
    <li><Link href='/show-task' className='hover:text-blue-300'>Show Task</Link> </li>
        </>
    )
  }
   
</ul>
</div>
<div>
    <ul className='flex space-x-4 '>
        {
            context.user && (
                <>
                <li><Link href='#'>{context.user.name}</Link> </li>
                <li><button onClick={doLogout}>Logout</button> </li>
                </>
            )
        }
          {
            !context.user && (
                <>
                <li><Link href='/login'>Login</Link> </li>
                <li><Link href='/signup'>Signup</Link> </li>
                </>
            )
        }
    </ul>
</div>
    </nav>
  )
}

export default CustomNavbar