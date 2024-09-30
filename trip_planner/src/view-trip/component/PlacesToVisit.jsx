import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className='font-bold text-lg mt-5'>Places to visit</h2>
      <div>
        {trip?.TripData?.itinerary.map((item, index) => {
          return (
            <div key={index} >
              <h2 className='font-bold text-lg'>{item.day}</h2>
              <div className='grid grid-cols-2 gap-5'>
              {item.plan.map((place, placeIndex) => {
                return (
                  <div key={placeIndex} className='my-3'>
                    <h2 className='font-medium text-sm text-orange-600'>{place.timeToTravel}</h2>
                    <h2>{place.placename}</h2>
                    <PlaceCardItem place={place} />
                  </div>
                );
              })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlacesToVisit;
