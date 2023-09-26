import React, { useEffect } from 'react';
// import { Video } from 'cloudinary-react';
import Title from '../Title'
import { Box, TextField, Typography } from '@mui/material'
import { BoxProduct, BoxUpload } from '@/Mui/Component/Product'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SongSchame, ifSong } from '../Interface/ValidateSong';
import { handImage, handleFileUpload } from '@/Mui/Component/handUpload';
import { useAppDispatch } from '@/store/hooks';
import {  handGetOne, handUpdateSong } from '@/store/Reducer/Song';
import { useParams } from 'react-router-dom';


const UpdateSong = () => {
  const [song , setSong] = React.useState<ifSong | null>(null);
  const dispatch = useAppDispatch();
  const {id} = useParams<{id ?: string}>();
  useEffect(() => {
    if (id) {
      handGetOne(id).then(({data}) => setSong(data)).catch((error) => console.error(error));
    }
    // handGetOne(id).then(({data}) => setSong(data)).catch((error) => console.error(error));
  },[id])

  const {register, reset , handleSubmit, formState : {errors}} = useForm({
    resolver : yupResolver(SongSchame)
  });
  useEffect(() => {
    return reset(song);
  },[reset, song])
  

  const handSubmitHandler = async (value : ifSong) => {
    value.song_link = await handleFileUpload(value.song_link);
    value.song_image = await handImage(value.song_image)
    const data = await dispatch(handUpdateSong(value));
    console.log(data);
    // if (payload) {
    //   alert(payload)
    // }
  }

return (
    <>
    <Title Title='Add New Song' />
    <Box sx={{ width : "100%", height : 1300 }} >
       <form onSubmit={handleSubmit(handSubmitHandler)} style={{ width : "100%", height : "100%",  display : "flex", justifyContent : 'space-between'} } encType="multipart/form-data" > 
       <Box sx={{ width : "60%", height : "100%" }} >
        <Box sx={{ width : "100%", height : "90%" }} >
          <Box sx={{ width : "100%", mt : "10px" ,height : "8%" }} >
            <Typography variant='h6' sx={{ fontWeight : "700" }} >Basic Information</Typography>
            <Typography>Section to config basic product information</Typography>
          </Box>
          <Box sx={{ width : "100%", height : "70%" }} >
            <BoxProduct sx={{ width : "100%", height : "16%" }} >
              <Typography sx={{ padding : "8px 0px" }} >Song Name</Typography>
              <TextField helperText={errors.song_name?.message} type='text' placeholder='Inter Song Name' {...register("song_name")} sx={{ width : "100%", '& .css-24rejj-MuiInputBase-input-MuiOutlinedInput-input' : {
                height : "10px"
              } }} />
            </BoxProduct>
            <BoxProduct sx={{ width : "100%", height : "16%" }} >
              <Typography sx={{ padding : "8px 0px" }} >Song Title</Typography>
              <TextField placeholder='Inter Song Title' type='text' helperText={errors.song_title?.message} {...register("song_title")} sx={{ width : "100%", '& .css-24rejj-MuiInputBase-input-MuiOutlinedInput-input' : {
                height : "10px"
              } }} />
            </BoxProduct>
            <BoxProduct sx={{ width : "100%", height : "16%" }} >
              <Typography sx={{ padding : "8px 0px" }} >Song Link</Typography>
              {/* asdadasdasdasd */}
              <TextField placeholder='Inter Song Title' type='file'  {...register("song_link")} error={Boolean(errors.song_link)} helperText={errors.song_link?.message}  sx={{ width : "100%", '& .css-24rejj-MuiInputBase-input-MuiOutlinedInput-input' : {
                height : "10px"
              } }} />
              {/* <input type='file' multiple onChange={handImage} /> */}
            </BoxProduct>
            <BoxProduct sx={{ width : "100%", height : "16%" }} >
              <Typography sx={{ padding : "8px 0px" }}  >Song Singer</Typography>
              <TextField placeholder='Inter Song Title' type='text' {...register("song_singer")} helperText={errors.song_singer?.message} sx={{ width : "100%", '& .css-24rejj-MuiInputBase-input-MuiOutlinedInput-input' : {
                height : "10px"
              } }} />
            </BoxProduct>
            <BoxProduct sx={{ width : "100%", height : "16%" }} >
              <Typography sx={{ padding : "8px 0px" }} >Song Musian</Typography>
              <TextField placeholder='Inter Song Musian' type='text' helperText={errors.song_musian?.message} {...register("song_musian")} sx={{ width : "100%", '& .css-24rejj-MuiInputBase-input-MuiOutlinedInput-input' : {
                height : "10px"
              } }} />
            </BoxProduct>
            <BoxProduct sx={{ width : "100%", height : "16%" }} >
              <Typography sx={{ padding : "8px 0px" }} >Song Lyric</Typography>
              <TextField placeholder='Inter Song Lyric' type='text' helperText={errors.song_lyric?.message} {...register("song_lyric")} sx={{ width : "100%", '& .css-24rejj-MuiInputBase-input-MuiOutlinedInput-input' : {
                height : "10px"
              } }} />
            </BoxProduct>
           </Box>
           <div className='w-full h-[25%] border-t' >
            <div className='w-full h-[30%]'>
              <h3 className='font-semibold text-xl mt-5 ' >Organizations</h3>
              <p className='text-[15px] text-gray-500 ' >Section to config the product attribute</p>
            </div>
            <div className='w-full h-[70%] grid grid-cols-2 gap-6 '>
              <div >
                <label  className="block mb-2 font-bold text-sm  text-gray-500 dark:text-white">Select Genre</label>
                {/* onChange={(e) => setGenre(e.target.value)} */}
                <select required  {...register("id_Genre")} className='block w-full border-gray-300 rounded-lg' >
                    <option value={""} selected>Choose a Genre</option>
                    <option value="64e239e9e5a2f10db4134352">Genre1</option>
                    <option value="CA">Canada</option>
                </select>
              </div>
              <div  >
              {/* onChange={(e) => setArtist(e.target.value)} */}
              {/* defaultValue={song.id_Artists} */}
              <label  className="block mb-2 font-bold text-sm  text-gray-500 dark:text-white">Select Artists</label>
                <select required  {...register("id_Artists")}  className='block w-full border-gray-300 rounded-lg' >
                    <option value={""} selected>Choose a Artists</option>
                    <option value="64c293500827f19d6cdde734">Artist 1</option>
                    <option value="CA">Canada</option>
                </select>
              </div>
            </div>
           </div>
           <div className='w-full h-[5%]'>
           <button type='submit' className='bg-purple-500 text-white w-[100px] h-[85%] rounded-lg ' >Submit</button>
           </div>
          </Box>
         </Box>
         <Box sx={{ width : "35%", height : "100%" }} >
         <Box sx={{ width : "100%", mt : "10px" ,height : "8%" }} >
            <Typography variant='h6' sx={{ fontWeight : "700" }} >Basic Information</Typography>
            <Typography>Section to config basic product information</Typography>
          </Box>
          <BoxUpload >
          <TextField {...register("song_image")} type="file" error={Boolean(errors.song_image)} inputProps={{ multiple: true}} helperText={errors.song_image?.message} sx={{ width : "100%", height : "100%", display :"block",
                 position : "absolute",
                 cursor: "pointer",
                 opacity: 0,
                 inset : "0px",
                 fontSize : "100%",
                 "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root" : {
                  width : "100%",
                  height : "100%",
                  cursor : "pointer",
                 },
                 "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input" : {
                  height : "100%",
                  // position : "absolute",
                 }
                  }} >

          </TextField>
          {/* <input type="file" accept=".mp3" onChange={handleFileUpload} style={{width : "100%", height : "100%", display :"block",
                 position : "absolute",
                 cursor: "pointer",
                 opacity: 0,
                 inset : "0px",
                 fontSize : "100%",
                 }} /> */}
                     {/* {uploadedVideo && <Video cloudName="dsbiugddk" publicId={uploadedVideo} />} */}
            <Box sx={{ textAlign : "center", margin : "4rem 0rem" }} >
              <img src="../../../../public/Image/upload.png" alt="" style={{marginLeft: "auto", marginRight : "auto", maxWidth : "100%" , height : "auto", display : "block", verticalAlign : "middle"}} />
              <Typography variant='body1'><span style={{fontWeight : 600}} >Drop your Video here, or </span><span style={{fontWeight : 600, color : "#1D5D9B"}} > browse</span></Typography>
              <Typography variant='body1' sx={{ color : "gray" }} >Support: jpeg, png</Typography>
            </Box>
          </BoxUpload>
         </Box>
       </form>
    </Box>
    </>
  )
}
export default UpdateSong