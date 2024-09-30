import { Button } from '@/components/ui/button'
import React from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';


function PlaceCardItem({place}) {
  return (
    // <Link to={'https://www.google.com/maps/search/?api=1&query=centurylink+field'+place?.placeName} target='_blank'>
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place?.placeName)}`}
      target='_blank'
    >
    <div className='border rounded-xl p-3 mt-3 flex gap-5 hover:scale-105 transition-all
    hover:shadow-md cursor-pointer'>
        <img src="/travel.jpg" alt="" className='w-[140px] h-[140px] rounded-xl'/>
        <div>
            <h2 className='font-bold text-lg'>{place.placeName}</h2>
            <p className='text-sm text-gray-500'>{place.placeDetails}</p>
            <h2 className='mt-2'>🕐{place.timeToTravel}</h2>
            <Button size='sm'><FaMapLocationDot />
            </Button>
        </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem