"use client"

import React, { useEffect, useState } from 'react'
import UserContext from './userContext'
import { httpAxios } from '@/helper/httpHelper'
import { toast } from 'react-toastify'
import { currentUser } from '@/models/services/userService'
const UserProvider = ({children}) => {
    const [user,setUser]=useState(undefined)
  useEffect(()=>{
  async function load(){
    try {
        const tempUser=await currentUser()
        console.log(tempUser);
        setUser({...tempUser})
       
       } catch (error) {
        // toast.error("error in loading data")
        setUser(undefined)
        console.log(error);
       }
  }
    load()
  },[])

  return (
    <UserContext.Provider value={{user,setUser}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserProvider



