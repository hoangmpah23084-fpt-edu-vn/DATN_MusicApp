/* eslint-disable @typescript-eslint/no-misused-promises */
// import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
// import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
// import { useAppDispatch } from "@/store/hooks";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { formArtist } from "../Interface/ISinger";
// import { handleAddArtist } from "../../../store/Reducer/singerReducer";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { handImage } from "@/Mui/Component/handUpload";

const AddArtist = () => {
  // const dispatch = useAppDispatch();
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(formArtist),
  // });
  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const handOnSubmit: SubmitHandler<any> = async (value: any) => {
  //   value.images = await handImage(value.images)
  //   console.log(value);
  //   console.log("Lalala");
  //   const { payload } = await dispatch(handleAddArtist(value));
  //   if (payload) {
  //     alert(payload);
  //   }
  // };
  // return (
  //   <div className="">
  //     <h4 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
  //       Add Artist
  //     </h4>
  //     <h5>
  //       <b>Basic Information</b>
  //     </h5>
  //     <form onSubmit={handleSubmit(handOnSubmit)}>
  //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
  //         <div className="lg:col-span-2">
  //           <div className="card mb-4 border-0 pb-6 py-4 md:border-gray-200 md:dark:border-gray-600 rounded-br-none rounded-bl-none card-border">
  //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //               <div className="flex flex-col">
  //                 <label>Name</label>
  //                 <input
  //                   className="border border-gray-300 rounded-md p-2"
  //                   placeholder="Name"
  //                   {...register("name")}
  //                 />
  //                 <div className="text-sm text-red-500">
  //                   {/* {errors.images?.message} */}
  //                   {errors.name?.message}
  //                 </div>
  //               </div>
  //               <div className="flex flex-col">
  //                 <label>Age</label>
  //                 <input
  //                   type="number"
  //                   min={0}
  //                   className="border border-gray-300 rounded-md p-2"
  //                   placeholder="Age"
  //                   {...register("age")}
  //                 />
  //                 <div className="text-sm text-red-500">
  //                   {errors.age?.message}
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="flex flex-col mt-[20px]">
  //               <label>Description</label>
  //               <textarea
  //                 className="border border-gray-300 rounded-md p-2"
  //                 placeholder="Description"
  //                 {...register("description")}
  //               ></textarea>
  //               <div className="text-sm text-red-500">
  //                 {errors.description?.message}
  //               </div>
  //             </div>
  //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-[20px]">
  //               <div className="flex flex-col">
  //                 <label>Album</label>
  //                 <select
  //                   required
  //                   {...register("album")}
  //                   className="block w-full border-gray-300 rounded-lg"
  //                 >
  //                   <option value={""}>Choose Album</option>
  //                   <option value="1">Hết Sức Thật Lòng</option>
  //                   <option value="2">Gieo</option>
  //                 </select>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="card mb-4 border-0 card-border grid grid-cols-1 md:grid-cols-1 gap-4">
  //           <div className="form-item vertical">
  //             <label className="form-label">Artist Image</label>
  //             <div className="upload upload-draggable rounded-md border-dashed border-2 outline-gray-200 hover:border-indigo-600">
  //               <input
  //                 multiple
  //                 className="upload-input draggable"
  //                 type="file"
  //                 {...register("images")}
  //               />
  //               <div className="my-16 text-center">
  //                 <AddPhotoAlternateOutlinedIcon />
  //                 <p className="font-semibold">
  //                   <span className="text-gray-800 dark:text-white">
  //                     Drop your image here, or{" "}
  //                   </span>
  //                   <span className="text-blue-500">browse</span>
  //                 </p>
  //                 <p className="mt-1 opacity-60 dark:text-white">
  //                   Support: jpeg, png
  //                 </p>
  //               </div>
  //               <div className="text-sm text-red-500">
  //                 {errors.images?.message}
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="sticky -bottom-1 -mx-8 px-8 flex items-center justify-between py-4 border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
  //           <div className="md:flex items-center jusstify-end">
  //             <button
  //               type="button"
  //               className="py-2 px-5 mr-2 mb-2 text-sm font-medium text-gray-500 focus:outline-none bg-white rounded-lg border border-gray-300 hover:bg-gray-100"
  //             >
  //               Discard
  //             </button>
  //             <button
  //               type="submit"
  //               className="py-[6px] px-5 mr-2 mb-2 text-sm font-medium text-gray-100 focus:outline-none bg-indigo-700 rounded-lg border border-gray-300 hover:bg-indigo-600"
  //             >
  //               <SaveOutlinedIcon></SaveOutlinedIcon>
  //               Save
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </form>
  //   </div>
  return <></>
};
export default AddArtist;