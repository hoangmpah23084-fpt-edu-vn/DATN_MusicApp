// import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
// import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
// import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
// import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { handleDeleteArtist, handleGetArtist } from "../../../store/Reducer/singerReducer";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";

const ListArtist = () => {
  // const dispatch = useAppDispatch();
  // const { artist } = useAppSelector(({ artist }) => artist);
  // console.log(artist);

  // useEffect(() => {
  //   void dispatch(handleGetArtist());
  // }, [dispatch]);
  // const handleDelete = (id: string) => {
  //   if (confirm("Bạn có chắc chắn muốn xóa không ? ")) {
  //     void dispatch(handleDeleteArtist(id));
  //   }
  // };
  // return (
  //   <div>
  //     <div className="lg:flex items-center justify-between mb-4">
  //       <div className="">
  //         <h4 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
  //           Artists
  //         </h4>
  //       </div>
  //       <div className="flex items-center">
  //         <div className="relative text-gray-500 mr-2 mb-2">
  //           <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
  //             <SearchOutlinedIcon />
  //           </div>
  //           <input
  //             type="search"
  //             className="block pl-10 text-sm border border-gray-300 rounded-lg"
  //             placeholder="Search Artist"
  //           />
  //         </div>
  //         <button
  //           type="button"
  //           className="py-2 px-5 mr-2 mb-2 text-sm font-medium text-gray-500 focus:outline-none bg-white rounded-lg border border-gray-300 hover:bg-gray-100"
  //         >
  //           <FilterAltOutlinedIcon />
  //           Filter
  //         </button>
  //         <button
  //           type="button"
  //           className="py-2 px-5 mr-2 mb-2 text-sm font-medium text-gray-500 focus:outline-none bg-white rounded-lg border border-gray-300 hover:bg-gray-100"
  //         >
  //           <FileDownloadOutlinedIcon />
  //           Export
  //         </button>
  //         <Link
  //           to="add-artist"
  //           type="button"
  //           className="py-2 px-5 mr-2 mb-2 text-sm font-medium text-gray-100 rounded-lg bg-indigo-700 hover:bg-indigo-500"
  //         >
  //           <AddCircleOutlinedIcon />
  //           Add Artist
  //         </Link>
  //       </div>
  //     </div>
  //     <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
  //       <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
  //         <tr>
  //           <th scope="col" className="px-6 py-3">
  //             Name
  //             <a href="" className="py-3">
  //               <UnfoldMoreIcon ></UnfoldMoreIcon>
  //             </a>
  //           </th>
  //           <th scope="col" className="px-6 py-3">
  //             Age
  //             <a href="" className="py-3">
  //               <UnfoldMoreIcon ></UnfoldMoreIcon>
  //             </a>
  //           </th>
  //           <th scope="col" className="px-6 py-3">
  //             Image
  //           </th>
  //           <th scope="col" className="px-6 py-3">
  //             Description
  //           </th>
  //           <th scope="col" className="px-6 py-3">
  //             Album
  //           </th>
  //           <th scope="col" className="px-6 py-3">
  //             List song
  //           </th>
  //           <th scope="col" className="px-6 py-3"></th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {artist?.map((item: any) => (
  //           <tr
  //             key={item._id}
  //             className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
  //           >
  //             <th
  //               scope="row"
  //               className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
  //             >
  //               {item.name}
  //             </th>
  //             <td className="px-6 py-4">{item.age}</td>
  //             <td className="px-6 py-4">
  //               <p>{item.images?.length}</p>
  //             </td>
  //             <td className="px-6 py-4">{item.description}</td>
  //             <td className="px-6 py-4">{item.album}</td>
  //             <td className="px-6 py-4">{item.songs.length}</td>
  //             <td className="px-6 py-4 text-right">
  //               <Link
  //                 to={`/admin/update-artist/${item._id}`}
  //                 className="font-medium text-grey-600 border-[1px] border-[#ed6c0285] px-[16px] py-[6px] mr-3 rounded-[4px] text-[#ed6c02] hover:bg-[#ebeae885]"
  //               >
  //                 EDIT
  //                 {/* <EditOutlinedIcon /> */}
  //               </Link>
  //               <button
  //                 onClick={() => handleDelete(item._id)}

  //                 className="font-medium text-grey-600 border-[1px] px-2 py-1 rounded-[4px] border-[#d32f2f] text-[#ed6c02] hover:bg-[#ebeae885] "
  //               >
  //                 {/* <DeleteOutlineOutlinedIcon /> */}
  //                 DELETE
  //               </button>
  //             </td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // );
  return <></>
};

export default ListArtist;