// import React from 'react';

// const MyAddedPets = () => {
//     return (
//         <div>
            
//         </div>
//     );
// };

// export default MyAddedPets;

import React, { useEffect, useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { authContext } from '../../Components/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
//import useAxiosSecure from '../../Hooks/useAxiosSecure';
//import { authContext } from '../../Components/AuthProvider';

const MyAddedPets = () => {
    const { user } = useContext(authContext); 
      const [requestedPets, setRequestedPets] = useState([]);
      const axiosSecure = useAxiosSecure();
      useEffect(() => {
          if (user?.email) {
            // fetch(`http://localhost:5000/pets/user?userEmail=${user.email}`)
            //   .then((res) => {
            //     if (!res.ok) {
            //       throw new Error('Failed to fetch requested pets');
            //     }
            //     return res.json();
            //   })
            //   .then((data) => {
            //     console.log(data);
            //     setRequestedPets(data); 
            //   })
            //   .catch((error) => {
            //     console.error('Error fetching requested pets:', error);
            //   });

        //     axios.get(`https://mileston-11-server-side.vercel.app/foods/user?userEmail=${user.email}`, {
        //     withCredentials: true
        // })
        //     .then(res => setRequestedFoods(res.data))
        //   }

        axiosSecure.get(`/pets/user?userEmail=${user.email}`)
        .then(res => setRequestedFoods(res.data));
}
        
        }, [user]);

// useEffect(() => {
//   if (user) {
//    // const userEmail = "shafisiyam674@gmail.com";
//     const url = `${import.meta.env.VITE_API_URL}/pets/user?userEmail=${user.email}`;
//     console.log("Fetching from URL:", url); // Debugging
//     fetch(url)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error('Failed to fetch requested pets');
//         }
//         return res.json();
//       })
//       .then((data) => {
//         console.log(data);
//         setRequestedPets(data);
//       })
//       .catch((error) => {
//         console.error('Error fetching requested pets:', error);
//       });
//   }
// }, [user]);
console.log(user?.email);

// useEffect(() => {
//   if (user?.email) {
//     console.log("Fetching pets for user:", user.email);
//     fetch(`http://localhost:5000/pets/user?userEmail=${user.email}`)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`Failed to fetch requested pets: ${res.statusText}`);
//         }
//         return res.json();
//       })
//       .then((data) => setRequestedPets(data))
//       .catch((error) => console.error('Error fetching requested pets:', error));
//   } else {
//     console.warn("User email is undefined.");
//   }
// }, [user]);

      
        const handleDelete = async (petId) => {
            Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!"
            }).then((result) => {
              if (result.isConfirmed) {
                // Perform the DELETE request
                fetch(`${import.meta.env.VITE_API_URL}/pets/${petId}`, {
                  method: 'DELETE',
                })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.deletedCount > 0) {
                      Swal.fire({
                        title: "Deleted!",
                        text: "Your food has been deleted.",
                        icon: "success",
                      });
                    
                      setRequestedPets((prev) =>
                        prev.filter((pet) => pet._id !== petId)
                      );
                      }
                   
                  })
                  .catch((error) => {
                    console.error('Error deleting food:', error);
                  
                  });
              }
            });
          };

    return (
        <div className="w-11/12 mx-auto">
<h2 className="text-3xl text-center mt-8 text-[#1E2A47] font-bold">My Added Pets: {requestedPets.length}</h2>
{requestedPets.length === 0 ? (
        <p className="text-center text-xl">No added pets found.</p>
      ) : (
            <div className="overflow-x-auto mt-8 max-w-full">
                <table className="table-auto md:table w-full text-sm md:text-base">
                    {/* head */}
                    <thead className="bg-gray-100">
                        <tr>
                            <th>
                            </th>
                            <th>Pet Name</th>
                            <th>Added By</th>
                            <th>Added Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            requestedPets.map((pet,index)=> <tr key={pet._id}>
                                <th>
                                {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={pet.PetImage}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{pet.PetName}</div>
                                            {/* <div className="text-sm opacity-50">{food.donatorName}</div> */}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                   {user.displayName}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">{user.email}</span>
                                </td>
                                <td>{pet.date}</td>
                                <th className='flex gap-1 flex-row-reverse'>
                                   
                                    <button
                      onClick={() => handleDelete(pet._id)}
                      className="btn-xs btn-error md:btn"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <Link  to='/'>
                     <button  className="btn-xs md:btn"><i class="fa-solid fa-pen-to-square"></i></button>
                    </Link> 
                    {/* /update/user/${pet._id}                   */}
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
      )}
        </div>
    );
};



export default MyAddedPets;