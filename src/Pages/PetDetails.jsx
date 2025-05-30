import React, { useState, useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { authContext } from "../Components/AuthProvider";

const PetDetails = () => {
  const data = useLoaderData();
  const { user } = useContext(authContext);
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState(""); // State for phone number
  const [address, setAddress] = useState(""); // State for address

  const {
    _id,
    PetName,
    PetImage,
    PetAge,
    PetCategory,
    PetLocation,
    Description,
    Notes,
    date,
    userName,
    userPhoto,
    userEmail,
  } = data || {};
   console.log(data)
  console.log(user);
 
  
  const handleRequest = () => {
    const requestData = {
      PetId: _id,
      PetName,
      PetImage,
      PetLocation,
      Notes,
      donatorEmail: userEmail,
      donatorName: userName,
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      requesterPhone: phoneNumber, 
      requesterAddress: address, 
    };

    fetch(`${import.meta.env.VITE_API_URL}/pets/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          Swal.fire("Success!", "Pet requested successfully!", "success");
          navigate("/");
        } else {
          Swal.fire("Error!", "Failed to request pet.", "error");
        }
      });
  };

  return (
    <div className="w-11/12 mx-auto">
      {/* Pet Details */}
      <div className="card w-2/3 mx-auto mt-10 border border-rounded-xl shadow-xl overflow-hidden p-4 mb-2 gap-3">
        <div className="mb-2 space-y-4">
          <img className="w-full h-60 object-cover border rounded-xl" src={PetImage} alt={`Cover picture of ${PetName}`} />
        </div>
        <div className="flex gap-2 justify-center">
          <h4 className="font-extrabold text-xl text-center">Pet Name: {PetName}</h4>
        </div>
        <div className="mt-4 flex flex-col gap-3 mb-2 text-center">
          <h5 className="font-bold mt-2">Pet Age: {PetAge}</h5>
          <h5 className="font-bold mt-2">Pet Category: {PetCategory}</h5>
          <h5 className="font-bold mt-2">Pet Location: {PetLocation}</h5>
          <h5 className="font-bold mt-2">Added Date: {date}</h5>
          <h5 className="font-bold mt-2">Owners Note: {Notes}</h5>
          <h5 className="font-bold mt-2">Description: {Description}</h5>
          <div className="flex flex-col text-center items-center">
            <h5 className="font-bold mt-2">Added By: {userName}</h5>
            <img className="w-10 h-10 rounded-full mt-2" src={userPhoto} alt="User" />
            <h5 className="font-bold mt-2">User Email: {userEmail}</h5>
          </div>
        </div>
      </div>

      {/* Request Button */}
      <div className="flex justify-center gap-2 md:gap-5 mt-10">
        <button
          onClick={() => document.getElementById("request_modal").showModal()}
          className="btn font-bold border border-[#1E2A47] rounded-full text-[#1E2A47] w-28 md:w-40 hover:text-white hover:bg-[#1E2A47]"
        >
          Adopt
        </button>
      </div>

      {/* Request Modal */}
      <dialog id="request_modal" className="modal">
        <div className="modal-box text-center items-center">
          <h2 className="text-xl font-bold mb-4">Request Pet</h2>
          <div className="space-y-4">
            <p><strong>Pet Name:</strong> {PetName}</p>
            <p>
              <strong>Pet Image:</strong>
              <img className="h-20 mt-2 ml-28 md:ml-40" src={PetImage} alt={PetName} />
            </p>
            <p><strong>Pet ID:</strong> {_id}</p>
            <p><strong>Donator Name:</strong> {userName}</p>
            <p><strong>Donator Email:</strong> {userEmail}</p>
            <p><strong>Pet Location:</strong> {PetLocation}</p>
            <p>
              <label htmlFor="userName">User Name:</label>
              <input
                id="userName"
                type="text"
                value={user?.displayName}
                disabled
                className="input input-bordered w-full mt-2"
              />
            </p>
            <p>
              <label htmlFor="userEmail">User Email:</label>
              <input
                id="userEmail"
                type="email"
                value={user?.email}
                disabled
                className="input input-bordered w-full mt-2"
              />
            </p>
            <p>
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                id="phoneNumber"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                className="input input-bordered w-full mt-2"
              />
            </p>
            <p>
              <label htmlFor="address">Address:</label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                className="textarea textarea-bordered w-full mt-2"
              ></textarea>
            </p>
          </div>
          <div className="modal-action">
            <button
              onClick={() => document.getElementById("request_modal").close()}
              className="btn border border-gray-400 text-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleRequest}
              className="btn border border-[#1E2A47] text-[#1E2A47] hover:text-white hover:bg-[#1E2A47]"
            >
              Submit Request
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PetDetails;

