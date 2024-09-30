// import axios from "axios"

// const Base_URl='https://places.googleapis.com/v1/places:searchText'

// const config={
//     headers:{
//         'Content-Type':'application/json',
//         'X-Goog-Api-key':import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
//         'X-Goog-FieldMask':[
//             'places.photos',
//             'places.displayName',
//             'place.id'
//         ]
//     }
// }
// export const GetPlaceDetails=(data)=>axios.post(Base_URl,data,config)
import axios from 'axios';

// Base URL for Google Places API Text Search
const BASE_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json';

// GetPlaceDetails function to call the API
export const GetPlaceDetails = (data) => {
  const params = {
    query: data.query, // Make sure 'query' contains the search text
    key: import.meta.env.VITE_GOOGLE_PLACE_API_KEY, // Use API key as query param
  };

  return axios.get(BASE_URL, { params })
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching place details:', error);
      throw error;
    });
};
