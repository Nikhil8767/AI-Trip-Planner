import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';


function Hotels({ trip }) {
  useEffect(() => {
    if (!trip) {
      console.log("No trip data passed to Hotels component.");
    } else {
      console.log("Trip Data:", trip);
    }
  }, [trip]);

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendations</h2>
      {/* <img src="/placeholder.jpg" alt="image" className="rounded-lg" /> */}

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {trip?.TripData?.hotel_options?.length > 0 ? (
          trip.TripData.hotel_options.map((hotel, index) => (
            <Link to={'https://www.google.com/maps/search/?api=1&query=centurylink+field'+hotel?.hotelName+","+hotel?.hotelAddress} target='_blank'>
            <div key={index} className="my-2 hover:scale-105 transition-all cursor-pointer">
                      <img src="/hotel.jpeg" alt="image" className="rounded-lg" />
                    <div className='my-2 flex flex-col gap-2'>
              <h2 className='font-medium'>{hotel?.hotelName}</h2>
              <h2 className='text-xs text-gray-500'>📍{hotel?.hotelAddress}</h2>
              <p className='text-gray-600'>{hotel?.description}</p>
              <h2 className='text-sm'>💰{hotel?.price}</h2>
              <h2 className='text-sm'>⭐{hotel?.rating}</h2>
              </div>
            </div>
            </Link>
           
          ))
        ) : (
          <p>No hotel options available.</p>
        )}
      </div>
    </div>
   
  );
}

export default Hotels;
