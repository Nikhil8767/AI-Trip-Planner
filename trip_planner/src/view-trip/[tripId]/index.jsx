import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from '../component/InfoSection';
import Hotels from '../component/Hotels';
import PlacesToVisit from '../component/PlacesToVisit';
import Footer from '../component/Footer';

function Viewtrip() {
  const {tripId}=useParams();
  const[trip,setTrip]=useState([]);

  useEffect(()=>{
    tripId && GetTripData();

  },[tripId])

  const GetTripData=async()=>{
    const docRef=doc(db,'AITrips',tripId);
    const docSnap=await getDoc(docRef);

    if(docSnap.exists()){
      console.log("Document:",docSnap.data());
      setTrip(docSnap.data())
    }
    else{
      console.log("no such doc");
      toast('no trip found')
      
    }
  }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      <InfoSection  trip={trip}/>
      <Hotels trip={trip}/>
      <PlacesToVisit trip={trip}/>
      <Footer trip={trip}/>

    </div>
  )
}

export default Viewtrip