import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

const AddArtist = () => {
  return <>
    <div className="">
      <h4 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Add Artist</h4>
    </div>
    <div className="">
      <h5><b>Basic Information</b></h5>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="card mb-4 border-0 border-b pb-6 py-4 md:border-gray-200 md:dark:border-gray-600 rounded-br-none rounded-bl-none card-border">
            <form action="/artists" method="post">
              <div className="flex flex-col">
                <label>Name</label>
                <input className="border border-gray-300 rounded-md p-2" />
              </div>
              <div className="flex flex-col">
                <label>Bio</label>
                <textarea className="border border-gray-300 rounded-md p-2"></textarea>
              </div>
              <div className="flex flex-col">
                <label>Image</label>
                <input type="file" name="image" id="image" className="border border-gray-300 rounded-md p-2" />
              </div>
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">Create</button>
            </form>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="card mb-4 border-0 card-border">
            <div className="card-body card-gutterless">
              <h5>Artist Image</h5>
              <div className="form-item vertical">
                <label className="form-label"></label>
                <div className="upload upload-draggable border rounded-md border-dashed border-2 outline-gray-200 hover:border-indigo-600">
                  <input className="upload-input draggable" type="file"/>
                  <div className="my-16 text-center">
                    <AddPhotoAlternateOutlinedIcon />
                    <p className="font-semibold"><span className="text-gray-800 dark:text-white">Drop your image here, or </span>
                      <span className="text-blue-500">browse</span>
                    </p>
                    <p className="mt-1 opacity-60 dark:text-white">Support: jpeg, png</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </>
}

export default AddArtist