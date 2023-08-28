import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { useAppDispatch } from "@/store/hooks";
import { useForm } from "react-hook-form";
import { IArtist, formArtist } from "./IArtist";
import { handleGetOne, handleUpdateArtist } from "./artistReducer";
import { yupResolver } from "@hookform/resolvers/yup";
import { handImage } from "@/Mui/Component/handUpload";
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Title from '../Title';

const UpdateArtist = () => {
  const [artist , setArtist] = React.useState<IArtist | null>(null);
  const dispatch = useAppDispatch();
  const {id} = useParams<{id ?: string}>();
  useEffect(() => {
    if (id) {
      handleGetOne(id).then(({data}) => setArtist(data)).catch((error) => console.error(error));
    }
  },[id])

  const {register, reset , handleSubmit, formState : {errors}} = useForm({
    resolver : yupResolver(formArtist)
  });
  useEffect(() => {
    return reset(artist);
  },[reset, artist])
  

  const onSubmit = async (value : IArtist) => {
    value.images = await handImage(value.images)
    const data = await dispatch(handleUpdateArtist(value));
    console.log(data);
  }
    return <div className="">
        <Title Title='Update Artist' />
        <h5>
          <b>Basic Information</b>
        </h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <div className="card mb-4 border-0 pb-6 py-4 md:border-gray-200 md:dark:border-gray-600 rounded-br-none rounded-bl-none card-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label>Name</label>
                    <input
                      className="border border-gray-300 rounded-md p-2"
                      placeholder="Name"
                      {...register("name")}
                    />
                    <div className="text-sm text-red-500">{errors.name?.message}</div>
                  </div>
                  <div className="flex flex-col">
                    <label>Age</label>
                    <input
                      type="number"
                      min={0}
                      className="border border-gray-300 rounded-md p-2"
                      placeholder="Age"
                      {...register("age")}
                    />
                    <div className="text-sm text-red-500">{errors.age?.message}</div>
                  </div>
                </div>
                <div className="flex flex-col mt-[20px]">
                  <label>Description</label>
                  <textarea
                    className="border border-gray-300 rounded-md p-2"
                    placeholder="Description"
                    {...register("description")}
                  ></textarea>
                  <div className="text-sm text-red-500">{errors.description?.message}</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-[20px]">
                  <div className="flex flex-col">
                    <label>Album</label>
                    <select
                      required
                      {...register("album")}
                      className="block w-full border-gray-300 rounded-lg"
                    >
                      <option value={""}>
                        Choose Album
                      </option>
                      <option value="1">Hết Sức Thật Lòng</option>
                      <option value="2">Gieo</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label>List song</label>
                    <input
                      className="border border-gray-300 rounded-md p-2"
                      placeholder="List song"
                      {...register("songs")}
                    />
                    <div className="text-sm text-red-500">{errors.songs?.message}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-4 border-0 card-border grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="form-item vertical">
                <label className="form-label">Artist Image</label>
                <div className="upload upload-draggable border rounded-md border-dashed border-2 outline-gray-200 hover:border-indigo-600">
                  <input
                    multiple 
                    className="upload-input draggable"
                    type="file"
                    accept="image/*"
                    {...register("images")}
                  />
                  <div className="my-16 text-center">
                    <AddPhotoAlternateOutlinedIcon />
                    <p className="font-semibold">
                      <span className="text-gray-800 dark:text-white">
                        Drop your image here, or{" "}
                      </span>
                      <span className="text-blue-500">browse</span>
                    </p>
                    <p className="mt-1 opacity-60 dark:text-white">
                      Support: jpeg, png
                    </p>
                  </div>
                  <div className="text-sm text-red-500">{errors.images?.message}</div>
                </div>
              </div>
            </div>
            <div className="sticky -bottom-1 -mx-8 px-8 flex items-center justify-between py-4 border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="md:flex items-center jusstify-end">
                <button
                  type="button"
                  className="py-2 px-5 mr-2 mb-2 text-sm font-medium text-gray-500 focus:outline-none bg-white rounded-lg border border-gray-300 hover:bg-gray-100"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 mr-2 mb-2 text-sm font-medium text-gray-100 focus:outline-none bg-indigo-700 rounded-lg border border-gray-300 hover:bg-indigo-600"
                >
                  <SaveOutlinedIcon></SaveOutlinedIcon>
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
}

export default UpdateArtist