import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className=' flex flex-col items-center mx-56 gap-9 '>
        <h1
        className='font-extrabold text-[60px] text-center mt-16'
        ><span className='text-[#f56551]'>Discover you next Adventure with our AI:</span>Personalized Itineraries at 
            your fingertips
        </h1>
        <p className='text-xl text-gray-500 text-center'>your personal trip planner and travel curator,creating custom 
            Itineraries tailor to your interst and budget
        </p>
        <Link to={'/create-trip'}>
        <Button>get Started! its free</Button>
        
        </Link>
    </div>
  )
}

export default Hero