import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Navigate, useNavigation } from 'react-router-dom';
import { Navigation } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


function Header() {

  const user=JSON.parse(localStorage.getItem('user'));
  const[openDailog,setOpenDialog]=useState(false);
  // const navigation=useNavigation();
  useEffect(()=>{
    console.log(user);
    
  },[])

  const login=useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error)
    
    
  })

  const GetUserProfile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,{
      headers:{
        Authorization:`Bearer ${tokenInfo?.access_token}`,
        Accept:'Application/json'
      }
    }).then((resp)=>{
      console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp.data));
      setOpenDialog(false)
      window.location.reload();
      
    })
  }
  return (
    <div className='p-3 shadow-sm flex justify-between items-center p-5'>
        <img src="/logo1.svg" alt="" className='h-[100px] w-[130px]' />
        <div>

        </div>
        <div>
            {user?
            <div className='flex items-center gap-5'>
              <a href="/create-trip">
              <Button variant="outline" className="rounded-full text-black">+ Create Trips</Button>
              </a>
              <a href="/my-trips">
              <Button variant="outline" className="rounded-full text-black">My Trips</Button>
              </a>
              <Popover>
            <PopoverTrigger className='bg-transparent'>
            <img src={user?.picture} alt="image" className='h-[35px] w-[35px] rounded-full' />

            </PopoverTrigger>
            <PopoverContent >
              <h2 className='cursor-pointer' onClick={()=>{
                googleLogout();
                localStorage.clear();
                window.location.reload();
              }}>logout</h2>
            </PopoverContent>
          </Popover>

            </div>:

            <Button onClick={()=>setOpenDialog(true)}>sign in</Button>
}
        </div>
        <Dialog open={openDailog}>
  
  <DialogContent>
    <DialogHeader>
      
      <DialogDescription>
        <img src="/logo.svg" alt="" />
        <h2 className="font-bold text-lg mt-7">sign in with google</h2>
        <p >sign in with to the site with google authentication security</p>

        <Button
        
        onClick={login} className="w-full mt-5 flex gap-4 items-center">
          
          <FcGoogle className="h-7 w-7" />sign in with google
          
          </Button>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default Header