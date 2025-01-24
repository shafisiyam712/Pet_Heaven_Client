import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { useContext, useState } from 'react';
import { authContext } from '../../Components/AuthProvider';
import { imageUpload } from '../../Api/Utils';

const AddPet = () => {
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
  const adopted = 'false';

  const petCategories = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: 'bird', label: 'Bird' },
    { value: 'rabbit', label: 'Rabbit' },
    { value: 'fish', label: 'Fish' },
    { value: 'reptile', label: 'Reptile' },
  ];

  const onSubmit = async (data) => {
    setSubmitError("");

    try {
      // Upload image
      const PetImage = await imageUpload(data.image[0]);

      // Create new pet 
      const newPet = {
        ...data,
        PetImage,
        PetAge: parseInt(data.PetAge),
        PetCategory: data.PetCategory.value, 
        userEmail,
        userName,
        userPhoto,
        adopted,
      };
      delete newPet.image;

      // Send data to PetCollection
      const response = await fetch(`${import.meta.env.VITE_API_URL}/pets`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(newPet),
      });

      const result = await response.json();
      if (result.insertedId) {
        Swal.fire({
          title: 'Success!',
          text: 'Your pet has been added successfully!',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        reset({
            PetCategory: null, 
            image: null,
            PetName: '',
            PetAge: '',
            PetLocation: '',
            Notes: '',
            Description: '',
          });
      }
    } catch (error) {
      setSubmitError("Something went wrong while adding your pet. Please try again.");
    }
  };

  return (
    <div className="lg:w-3/4 mx-auto">
      <div className="text-center p-10">
        <h1 className="text-[#1E2A47] text-5xl font-bold dark:text-white">Add Your Pet</h1>
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
                <span className="label-text text-black">Pet Image</span>
              </label>
              <input
                type="file"
                {...register('image', { required: 'Pet image is required' })}
                accept="image/*"
                className="file-input file-input-bordered text-black"
              />
              {errors.image && <p className="text-red-500">{errors.image.message}</p>}
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text text-black">Pet Name</span>
              </label>
              <input
                type="text"
                {...register('PetName', { required: 'Pet name is required' })}
                placeholder="Pet Name"
                className="input input-bordered text-black"
              />
              {errors.PetName && <p className="text-red-500">{errors.PetName.message}</p>}
            </div>
          </div>

          {/* Form second row */}
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text text-black">Pet Age</span>
              </label>
              <input
                type="number"
                {...register('PetAge', { required: 'Pet age is required' })}
                placeholder="Pet Age"
                className="input input-bordered text-black"
              />
              {errors.PetAge && <p className="text-red-500">{errors.PetAge.message}</p>}
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text text-black">Pet Category</span>
              </label>
              <Controller
                name="PetCategory"
                control={control}
                rules={{ required: 'Pet category is required' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={petCategories}
                    placeholder="Select Category"
                    classNamePrefix="react-select"
                  />
                )}
              />
              {errors.PetCategory && (
                <p className="text-red-500">{errors.PetCategory.message}</p>
              )}
            </div>
          </div>

          {/* Form third row */}
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text text-black">Pet Location</span>
              </label>
              <input
                type="text"
                {...register('PetLocation', { required: 'Pet location is required' })}
                placeholder="Pet Location"
                className="input input-bordered text-black"
              />
              {errors.PetLocation && <p className="text-red-500">{errors.PetLocation.message}</p>}
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
            <button className="btn font-bold border border-[#1E2A47] rounded-full w-2/6 mx-auto text-[#1E2A47] hover:text-white hover:bg-[#1E2A47]">
              Add Pet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPet;
