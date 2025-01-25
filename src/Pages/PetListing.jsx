import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import Pets from '../Components/Pets';

const PetListing = () => {
    const food = useLoaderData();
    const [search, setSearch] = useState("");
    const [foodData, setFoodData] = useState(food);
    const [isTwoColumn, setIsTwoColumn] = useState(false); // State to toggle layout
    const [selectedCategory, setSelectedCategory] = useState("");
    useEffect(() => {
        const fetchPets = async () => {
            const url = `${import.meta.env.VITE_API_URL}/pets?searchParams=${search}&category=${selectedCategory}`;
            console.log("Fetching from URL:", url);
    
            const response = await fetch(url);
            const data = await response.json();
            setFoodData(data);
        };
    
        fetchPets();
    }, [search, selectedCategory]); 
    
    

    return (
        <div className=''>
            <div className="text-center my-14">
                <h1 className="font-extrabold text-[#1E2A47] text-3xl mb-3">Explore Our Vast Collections of Foods</h1>
                <h2 className='mb-3'>There is a huge collection of foods added by our users and admins. <br />
                You can search and sort food according to their Expired date.
                </h2>
                <div className='flex  items-center justify-center mt-10'>
                <div className="w-[450px] mx-auto">
                    <input
                        onChange={(e) => {
                            console.log("Search Input:", e.target.value); // Debugging
                            setSearch(e.target.value);
                        }}
                        type="text"
                        name="search"
                        placeholder="search"
                        className="input input-bordered w-full text-black"
                        required
                    />
                </div>
                {/* Dropdown for PetCategory */}
                <div className="w-[200px] mx-auto">
                        <select
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="select select-bordered w-full text-black"
                        >
                            <option value="">All Categories</option>
                            <option value="dogs">Dogs</option>
                            <option value="cats">Cats</option>
                            <option value="birds">Birds</option>
                            <option value="rabbit">Rabbits</option>
                            <option value="fish">Fish</option>
                            <option value="reptile">Reptile</option>
                        </select>
                    </div>
                {/* <button  onClick={sortFoodByDate} className='btn font-bold border border-[#1E2A47] rounded-full w-40 mx-auto text-[#1E2A47]  hover:text-white hover:bg-[#1E2A47]'>Sort Food</button> */}
                </div>
                
            </div>
            <div
                className={`w-11/12  pl-7 mx-auto grid ${
                    isTwoColumn ? "grid-cols-1 md:grid-cols-1 lg:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                } gap-2 mt-10`}
            >
                {foodData.map((pets) => (
                    <Pets key={pets._id} pets={pets}></Pets>
                ))} 
            </div>
            <div className="w-36 mx-auto mt-10 pl-2">
                <button
                    onClick={() => setIsTwoColumn(!isTwoColumn)} 
                    className="btn font-bold border border-[#1E2A47] rounded-full text-[#1E2A47]  hover:text-white hover:bg-[#1E2A47]"
                >
                    
                    Change Layout
                </button>
            </div>
        </div>
    );
};

export default PetListing;