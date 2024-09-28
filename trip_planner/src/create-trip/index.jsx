// import { Input } from 'postcss';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { SelectBudgetOption, SelectTravelsList } from "@/constants/option";
import { chatSession } from "@/service/AImodel";

import React, { useEffect } from 'react'
import { useState } from 'react';
// import TextField from '@mui/material/TextField'; 
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from 'axios';
// import { l } from "vite/dist/node/types.d-aGj9QkWt";
import { AI_PROMPT } from "@/constants/option";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseconfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";




function CreateTrip() {
  const [place, setplace] = useState();

  const [formData,setFormData]=useState([]);
  const [openDailog,setOpenDialog]=useState(false);

  const[loading,setLoading]=useState(false);

  const handleInputChange=(name,value)=>{
    // if(name=='noOfDays' && value>5){
    //   console.log("please enter value less than 5");
      
    //   return 
    // }
    setFormData({
      ...formData,
      [name]:value
    })


  }
  useEffect(()=>{
  console.log(formData);
  
  },[formData])

  const login=useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error)
    
    
  })

  const OnGenerateTrip=async()=>{

    const user=localStorage.getItem('user')
    if(!user){
      setOpenDialog(true)
      return;
    }
    if(formData?.noOfDays>5&&!formData?.location ||!formData?.budget||!formData?.traveller){
      toast("please fill  all details")
      return;
    }
    setLoading(true);
    const FINAL_PROMPT=AI_PROMPT
    .replace('{location}',formData?.location?.label)
    .replace('{totalDays}',formData?.noOfDays)
    .replace('{traveller}',formData?.traveller)
    .replace('{budget}',formData?.budget)
    .replace('{totalDays}',formData?.noOfDays)
    
    // console.log(FINAL_PROMPT);
    
    const result=await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text())
    
  }

  const SaveAiTrip=async(TripData)=>{
    setLoading(true);
    const user =JSON.parse(localStorage.getItem('user'));
    const docId=Date.now().toString()
    
    // Add a new document in collection "cities"
      await setDoc(doc(db, "AITrips", docId), {
        userSelection:formData,
        TripData:JSON.parse(TripData),
        userEmail:user?.email,
        id:docId  
        });
        setLoading(false);

     }

  const GetUserProfile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,{
      headers:{
        Authorization:`Bearer ${tokenInfo?.access_token}`,
        Accept:'Application/json'
      }
    }).then((resp)=>{
      console.log(resp);
      // localStorage.setItem('user',JSON.stringify(resp.data));
      // setOpenDialog(false)
      // OnGenerateTrip()
      
    })
  }
  // ************************************by gpt**************************
//   const GetUserProfile = async (tokenInfo) => {
//     if (!tokenInfo || !tokenInfo.access_token) {
//         console.error("Invalid tokenInfo or access token is missing.");
//         toast("Unable to fetch user profile. Please log in again.");
//         return;
//     }

//     try {
//         const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
//             headers: {
//                 Authorization: `Bearer ${tokenInfo.access_token}`,
//                 Accept: 'application/json'
//             }
//         });
        
//         console.log(response.data); // Log the user profile data
//         // You can also return or process the response data as needed here.
        
//     } catch (error) {
//         console.error("Error fetching user profile:", error);
//         toast("Failed to fetch user profile. Please try again.");
//     }
// }

  // *******************************************************

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 ml-60 '>
      <h2 className='font-bold text-3xl'>Tell us your travel preference</h2>
      <p className='mt-3 text-gray-500 text-xl'>just provide some basic information ,and our trip planner will generate
        a customized itinerary based on your preference
      </p>
      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is destination of choice ?</h2>
          {/* <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => { setplace(v); handleInputChange('location',v) }
            }}
          /> */
          // ***mera
          <Input placeholder={'ex.paris'} type="text" onChange={(e)=>handleInputChange
            ('desination',e.target.value)
          }
          />
          }
        </div>
        <div>
          <h2 className='text-xl my-3 font-medium'>how many days are you planning for the trip?</h2>
          <Input placeholder={'ex.3'} type="number" 
          onChange={(e)=>handleInputChange('noOfDays',e.target.value)}
          />
        </div>
      </div>
      <div>
        <h2 className='text-xl my-3 font-medium'>what is your budget ?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOption.map((item, index) => (
            <div key={index}
            onClick={()=>handleInputChange('budget',item.title)}
            className={`p-4 rounded-lg cursor-pointer hover:shadow-lg
              ${formData?.budget==item.title&&'shadow-lg border-black'}
            `}>
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold">{item.budget}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>

      </div>
      <div>
        <h2 className='text-xl my-3 font-medium'>what do you plan travelling with on your next adventure ?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelsList.map((item, index) => (
            <div key={index} 
            onClick={()=>handleInputChange('traveller',item.people)}
            className={`p-4 rounded-lg cursor-pointer hover:shadow-lg
            ${formData?.traveller==item.people&&'shadow-lg border-black'}
            `}>
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold">{item.budget}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>

      </div>
      <div className="my-10 justify-end flex">
      <Button
      disabled={loading}
      onClick={OnGenerateTrip}>
        {loading?
        <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />:'generate trip'
        }
        </Button>
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

export default CreateTrip