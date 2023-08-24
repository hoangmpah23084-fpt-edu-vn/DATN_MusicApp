import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// import { useFetchArtistQuery, useRemoveArtistMutation } from './Artist.service';

const Artist = () => {
    // const { data } = useFetchArtistQuery();
    // const [remove] = useRemoveArtistMutation();
    // const handleDelete = (id?: string) => {
    //     if(id){
    //         let cf = confirm("Ban co chac muon xoa?")
    //         if(cf){
    //             remove(id)
    //         }
    //     }
    // }
    // const handleUpdate = (id?: string) => {
    //     if(id) {
    //         window.location.href = `/update/${id}`;
    //     }
    // }

    return <div>
        <div className="lg:flex items-center justify-between mb-4">
            <div className="">
                <h4 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Artists</h4>
            </div>
            <div className="flex items-center">
                <div className="relative text-gray-500 mr-2 mb-2">
                    <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                    <SearchOutlinedIcon></SearchOutlinedIcon>
                    </div>
                    <input type="search" className="block pl-10 text-sm border border-gray-300 rounded-lg" placeholder="Search Artist" />
                </div>
                <button type="button" className="py-2 px-5 mr-2 mb-2 text-sm font-medium text-gray-500 focus:outline-none bg-white rounded-lg border border-gray-300 hover:bg-gray-100">
                    <FilterAltOutlinedIcon></FilterAltOutlinedIcon>
                    Filter
                </button>
                <button type="button" className="py-2 px-5 mr-2 mb-2 text-sm font-medium text-gray-500 focus:outline-none bg-white rounded-lg border border-gray-300 hover:bg-gray-100">
                    <FileDownloadOutlinedIcon></FileDownloadOutlinedIcon>
                    Export
                </button>
                <a href="add-artist" type="button" className="py-2 px-5 mr-2 mb-2 text-sm font-medium text-gray-100 rounded-lg bg-indigo-700 hover:bg-indigo-500">
                    <AddCircleOutlinedIcon></AddCircleOutlinedIcon>
                    Add Artist
                </a>
            </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">Name
                        <a href="" className="py-3">
                            <UnfoldMoreIcon></UnfoldMoreIcon>
                        </a>
                    </th>
                    <th scope="col" className="px-6 py-3">Age
                        <a href="" className="py-3">
                            <UnfoldMoreIcon></UnfoldMoreIcon>
                        </a></th>
                    <th scope="col" className="px-6 py-3">Image</th>
                    <th scope="col" className="px-6 py-3">Desc</th>
                    <th scope="col" className="px-6 py-3">Album</th>
                    <th scope="col" className="px-6 py-3">List song</th>
                    <th scope="col" className="px-6 py-3"></th>
                </tr>
            </thead>
            <tbody>
            {/* {data?.map((item) => ( */}
                <tr 
                    // key={item._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">aNgọt</th>
                    <td className="px-6 py-4">10</td>
                    <td className="px-6 py-4">
                        <img src="https://i.pinimg.com/564x/ee/be/f9/eebef96744ec5970b5c8b573bc240b57.jpg" className="h-[50px]" />
                    </td>
                    <td className="px-6 py-4">Ngọt là ban nhạc pop rock Việt Nam gồm 4 thành viên.</td>
                    <td className="px-6 py-4">Gieo, Ng'bthg</td>
                    <td className="px-6 py-4">Lần cuối, Thấy chưa, Chuyển kênh, Đá tan</td>
                    <td className="px-6 py-4 text-right">
                        <button 
                            // onClick={() => handleUpdate(item._id)}
                            className="font-medium text-grey-600 dark:text-grey-200 hover:underline"
                        >
                            <EditOutlinedIcon ></EditOutlinedIcon>
                        </button>
                        <button 
                            // onClick={() => handleDelete(item._id)}
                            className="font-medium text-grey-600 dark:text-grey-200 hover:underline"
                        >
                            <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
                        </button>
                    </td>
                </tr>
            {/* ))} */}
            </tbody>
        </table>
    </div>
}
export default Artist