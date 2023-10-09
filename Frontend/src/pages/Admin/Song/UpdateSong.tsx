/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect } from 'react';
// import { Video } from 'cloudinary-react';
import Title from '../Title'
import { Box, TextField, Typography } from '@mui/material'
import { BoxProduct, BoxUpload, TypographySong } from '@/Mui/Component/Product'
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SongSchame, ifSong } from '../Interface/ValidateSong';
import { handImage, handleFileUpload } from '@/Mui/Component/handUpload';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {  handGetOne, handUpdateSong } from '@/store/Reducer/Song';
import { useParams } from 'react-router-dom';
import { getGenre } from '@/store/Reducer/genreReducer';
import { handleGetArtist } from '@/store/Reducer/artistReducer';
import { ifGenre } from '../Interface/validateAlbum';
import { IArtist } from '../Interface/IArtist';


const UpdateSong = () => {
  const [song , setSong] = React.useState<ifSong>();
  const dispatch = useAppDispatch();
  const {genre} = useAppSelector(({genre}) => genre);
  const {artist} = useAppSelector(({artist}) => artist);
  
  const {id} = useParams<{id ?: string}>();
  useEffect(() => {
    if (id) {
      handGetOne(id).then(({data}) => {
        setSong(data)
      }).catch((error) => console.error(error));
    }
    void dispatch(getGenre());
    void dispatch(handleGetArtist());
  },[id, dispatch])

  const {register, reset , handleSubmit, formState : {errors}} = useForm({
    resolver : yupResolver(SongSchame)
  });
  useEffect(() => {
    return reset(song);
  },[reset, song])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handSubmitHandler : SubmitHandler<any> = async (value : ifSong) => {
    value.song_link = await handleFileUpload(value.song_link);
    value.song_image = await handImage(value.song_image)
    const data = await dispatch(handUpdateSong(value));
    console.log(data);
    alert("Cập nhật song thành công")
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
            <BoxProduct >
              <TypographySong >Song Name</TypographySong>
              <TextField helperText={errors.song_name?.message} type='text' placeholder='Inter Song Name' {...register("song_name")} sx={{ width : "100%", '& .css-24rejj-MuiInputBase-input-MuiOutlinedInput-input' : {
                height : "10px"
              } }} />
            </BoxProduct>
            <BoxProduct >
              <TypographySong >Song Title</TypographySong>
              <TextField placeholder='Inter Song Title' type='text' helperText={errors.song_title?.message} {...register("song_title")} sx={{ width : "100%", '& .css-24rejj-MuiInputBase-input-MuiOutlinedInput-input' : {
                height : "10px"
              } }} />
            </BoxProduct>
            <BoxProduct >
              <TypographySong>Song Link</TypographySong>
              <TextField placeholder='Inter Song Title' type='file'  {...register("song_link")} error={Boolean(errors.song_link)} helperText={errors.song_link?.message}  sx={{ width : "100%", '& .css-24rejj-MuiInputBase-input-MuiOutlinedInput-input' : {
                height : "10px"
              } }} />
            </BoxProduct>
            <BoxProduct >
              <TypographySong  >Song Singer</TypographySong>
              <TextField placeholder='Inter Song Title' type='text' {...register("song_singer")} helperText={errors.song_singer?.message} sx={{ width : "100%", '& .css-24rejj-MuiInputBase-input-MuiOutlinedInput-input' : {
                height : "10px"
              } }} />
            </BoxProduct>
            <BoxProduct >
              <TypographySong >Song Musian</TypographySong>
              <TextField placeholder='Inter Song Musian' type='text' helperText={errors.song_musian?.message} {...register("song_musian")} sx={{ width : "100%", '& .css-24rejj-MuiInputBase-input-MuiOutlinedInput-input' : {
                height : "10px"
              } }} />
            </BoxProduct>
            <BoxProduct >
              <TypographySong >Song Lyric</TypographySong>
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
                    {
                      genre.map((item : ifGenre) => <option key={item._id}  value={item._id} selected>{item.name}</option>)
                    }
                </select>
              </div>
              <div  >
              <label  className="block mb-2 font-bold text-sm  text-gray-500 dark:text-white">Select Artists</label>
                <select required  {...register("id_Artists")}  className='block w-full border-gray-300 rounded-lg' >
                  {
                    artist.map((item : IArtist) => <option key={item._id} value={item._id} selected>{item.name}</option>)
                  }
                </select>
              </div>
            </div>
           </div>
           <div className='w-full h-[5%]'>
           <button type='submit' className='bg-purple-500 text-white w-[100px] h-[85%] rounded-lg' >Submit</button>
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
                 }
                  }} >

          </TextField>
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