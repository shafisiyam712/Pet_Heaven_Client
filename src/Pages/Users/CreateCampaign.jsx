import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useContext, useState } from 'react';
import { authContext } from '../../Components/AuthProvider';
import { imageUpload } from '../../Api/Utils';

const CreateCampaign = () => {
  const { user } = useContext(authContext);
  const [submitError, setSubmitError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } =useForm();

  const userEmail = user?.email;
  const userName = user?.displayName;
  const userPhoto = user?.photoURL;
  //const adopted = 'false';

//   const petCategories = [
//     { value: 'dog', label: 'Dog' },
//     { value: 'cat', label: 'Cat' },
//     { value: 'bird', label: 'Bird' },
//     { value: 'rabbit', label: 'Rabbit' },
//     { value: 'fish', label: 'Fish' },
//     { value: 'reptile', label: 'Reptile' },
//   ];

  const onSubmit = async (data) => {
    setSubmitError("");

    try {
      // Upload image
      const CampaignImage = await imageUpload(data.image[0]);

      // Create new pet 
      const newCampaign = {
        ...data,
        CampaignImage,
        amount: parseInt(data.amount),
        userEmail,
        userName,
        userPhoto,
      };
      delete newCampaign.image;

      // Send data to PetCollection
      const response = await fetch(`${import.meta.env.VITE_API_URL}/campaigns`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(newCampaign),
      });

      const result = await response.json();
      if (result.insertedId) {
        Swal.fire({
          title: 'Success!',
          text: 'Your Campaign has been added successfully!',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        // reset({
        //     image: null,
        //     amount: '',
        //     Date: '',
        //     Notes: '',
        //     Description: '',
        //   });
        reset();
      }
    } catch (error) {
      setSubmitError("Something went wrong while adding your pet. Please try again.");
    }
  };

  return (
    <div className="lg:w-3/4 mx-auto">
      <div className="text-center p-10">
        <h1 className="text-[#1E2A47] text-5xl font-bold dark:text-white">Add Your Campaign</h1>
        <p className="py-6">
          Add your pet. Fill up the form with your pet's information. It will be listed on our website for adoption or viewing!
        </p>
      </div>
      <div className="card bg-base-100 w-full shrink-0 shadow-2xl rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body rounded-xl">
          {/* Form first row */}
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text text-black">Campaign Image</span>
              </label>
              <input
                type="file"
                {...register('image', { required: 'Campaign image is required' })}
                accept="image/*"
                className="file-input file-input-bordered text-black"
              />
              {errors.image && <p className="text-red-500">{errors.image.message}</p>}
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text text-black">Max Donation Amount</span>
              </label>
              <input
                type="number"
                {...register('amount', { required: 'Campaign amount is required' })}
                placeholder="Max amount"
                className="input input-bordered text-black"
              />
              {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
            </div>
          </div>

          {/* Form second row */}
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text text-black">Last Date Of Donation</span>
              </label>
              <input
                type="date"
                {...register('Date', { required: 'Date is required' })}
                placeholder="Last Date"
                className="input input-bordered text-black"
              />
              {errors.Date && <p className="text-red-500">{errors.Date.message}</p>}
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text text-black">Owner's Notes</span>
              </label>
              <input
                type="text"
                {...register('Notes', { required: 'Notes are required' })}
                placeholder="Notes"
                className="input input-bordered text-black"
              />
              {errors.Notes && <p className="text-red-500">{errors.Notes.message}</p>}
            </div>
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black">Description</span>
            </label>
            <textarea
              {...register('Description', { required: 'Description is required' })}
              placeholder="Description"
              className="textarea textarea-bordered text-black"
            ></textarea>
            {errors.Description && <p className="text-red-500">{errors.Description.message}</p>}
          </div>

          {/* Submit error */}
          {submitError && <p className="text-red-500 text-center">{submitError}</p>}

          {/* Submit button */}
          <div className="form-control mt-6">
            <button className="btn font-bold border border-[#04738C] rounded-full w-2/6 mx-auto text-[#04738C] hover:text-white hover:bg-[#04738C]">
              Add Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaign;
