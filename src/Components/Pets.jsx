import React from 'react';
import { Link } from 'react-router-dom';

const Pets = ({pets}) => {
    const {_id,PetName,PetImage,PetAge, PetLocation,PetCategory}= pets || {}
   
   
    return (
        <div className="w-11/12 mx auto">
             
            <div className='card border border-rounded-xl transition  hover:scale-105 shadow-xl overflow-hidden p-4 mb-2 gap-3'>
            <div className='mb-2  space-y-4 '>
        <img className='w-full h-60 object-cover border rounded-xl' src={PetImage} alt={`Cover picture of the title`} />
    </div>  
      <div className='flex gap-2 justify-center'>
      <h4 className='font-extrabold text-xl'>{PetName}</h4>
      </div>
      

            <div className='mt-3 flex flex-col gap-3 mb-2'>
           
                <h5 className='font-bold mt-2'>Food Quantity: {PetAge}</h5>
                <h5 className='font-bold mt-2'>PickUpLocation: {PetLocation}</h5>
                
                    <div className='md:ml-24'>
 <Link to={`/pets/${_id}`}>
                     <button className='btn font-bold border border-[#1E2A47] rounded-full text-[#1E2A47] w-1/2 hover:text-white hover:bg-[#1E2A47]'>See Details</button>
                </Link>
                    </div>
               
               
            </div>
        </div>


      
        </div>
    );
};

export default Pets;