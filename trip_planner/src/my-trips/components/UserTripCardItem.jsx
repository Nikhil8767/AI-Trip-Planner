import React from 'react'
import { Link } from 'react-router-dom'

function UserTripCardItem({trip}) {
  return (
    <Link to={'/view-trip/'+trip?.id} className='no-underline text-black'>
    <div className='hover:scale-105 transition-all '>
        <img src="/history.jpeg" alt="" className="object-cover rounded-xl h-[220px]"/>
        <div>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.location}</h2>
            <h2 className='text-sm text-gray-600'>{trip?.userSelection?.noOfDays} days trip with {trip.userSelection?.budget} budget</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem