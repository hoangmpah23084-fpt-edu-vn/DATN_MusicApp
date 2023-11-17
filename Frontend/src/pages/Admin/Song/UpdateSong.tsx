/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from 'react';
import Title from '../Title'
import { Box, TextField, Typography } from '@mui/material'
import { BoxProduct, BoxUpload, LoadingButtonCl } from '@/Mui/Component/Product'
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SongSchame, ifSong, ifSongAdmin } from '../Interface/ValidateSong';
import { handImage, handleFileUpload } from '@/Mui/Component/handUpload';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {  handGetOne, handUpdateSong } from '@/store/Reducer/Song';
import { Link, useParams } from 'react-router-dom';
import { getGenre } from '@/store/Reducer/genreReducer';
import { handleGetArtist } from '@/store/Reducer/artistReducer';
import { ifGenre } from '../Interface/validateAlbum';
import { IArtist } from '../Interface/IArtist';

const UpdateSong = () => {
  const [song , setSong] = useState<ifSong>();
  const [loading, setLoading] = useState(false);
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
  console.log(song);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handSubmitHandler : SubmitHandler<any> = async (value : ifSongAdmin) => {
    setLoading(true);
    value.song_link = await handleFileUpload(value.song_link);
    value.song_image = await handImage(value.song_image)
    await dispatch(handUpdateSong(value));
    setLoading(false);
    alert("Cập nhật song thành công")
  }
  return (
    <>
    <Title Title='Cập nhật bài hát' />
    <Box sx={{ width : "100%", height : 900 }} >
       <form onSubmit={handleSubmit(handSubmitHandler)} style={{ width : "100%", height : "100%",  display : "flex", justifyContent : 'space-between'} } encType="multipart/form-data" > 
       <Box sx={{ width : "60%", height : "100%" }} >
        <Box sx={{ width : "100%", height : "90%" }} >
          <Box sx={{ width : "100%", mt : "10px" ,height : "8%" }} ></Box>
          <Box sx={{ width : "100%", height : "70%" }} >
            <BoxProduct sx={{ width : "100%", height : "20%" }} >
              <Typography sx={{ padding : "8px 0px" }} >Tên nhạc</Typography>
              <TextField helperText={errors.song_name?.message} type='text' placeholder='Inter Song Name' {...register("song_name")} sx={{ width : "100%", '& .css-24rejj-MuiInputBase-input-MuiOutlinedInput-input' : {
                height : "10px"
              } }} />
            </BoxProduct>
                 <p>{errors.song_image?.message}</p>
            <BoxProduct sx={{ width : "100%", height : "20%" }} >
              <Typography sx={{ padding : "8px 0px" }} >Link Nhạc</Typography>
              <TextField placeholder='Inter Song Title' type='file' inputProps={{ multiple: true}}  {...register("song_link")} error={Boolean(errors.song_link)} helperText={errors.song_link?.message}  sx={{ width : "100%", '& .css-24rejj-MuiInputBase-input-MuiOutlinedInput-input' : {
                height : "10px"
              } }} />
            </BoxProduct>
            <BoxProduct sx={{ width : "100%", height : "20%" }} >
              <Typography sx={{ padding : "8px 0px" }}  >Tiêu đề bài hát</Typography>
              <TextField placeholder='Inter Song Title' type='text' {...register("song_title")} helperText={errors.song_title?.message} sx={{ width : "100%", '& .css-24rejj-MuiInputBase-input-MuiOutlinedInput-input' : {
                height : "10px"
              } }} />
            </BoxProduct>
            <BoxProduct sx={{ width : "100%", height : "20%" }} >
              <Typography sx={{ padding : "8px 0px" }}  >Ca sĩ</Typography>
              <TextField placeholder='Inter Song Title' type='text' {...register("song_singer")} helperText={errors.song_singer?.message} sx={{ width : "100%", '& .css-24rejj-MuiInputBase-input-MuiOutlinedInput-input' : {
                height : "10px"
              } }} />
            </BoxProduct>
            <BoxProduct sx={{ width : "100%", height : "20%" }} >
              <Typography sx={{ padding : "8px 0px" }} >Lời bài hát</Typography>
              <TextField placeholder='Inter Song Lyric' type='text' helperText={errors.song_lyric?.message} {...register("song_lyric")} sx={{ width : "100%", '& .css-24rejj-MuiInputBase-input-MuiOutlinedInput-input' : {
                height : "10px"
              } }} />
            </BoxProduct>
           </Box>
           <div className='w-full h-[25%] border-t' >
            <div className='w-full h-[30%]'>
              <h3 className='font-semibold text-xl mt-5 ' >Danh mục</h3>
              <p className='text-[15px] text-gray-500 ' >Vui lòng chọn danh mục</p>
            </div>
            <div className='w-full h-[70%] grid grid-cols-2 gap-6 '>
              <div >
              {/* onChange={(e) => setGenre(e.target.value)} */}
                <label  className="block mb-2 font-bold text-sm  text-gray-500 dark:text-white">Select Genre</label>
                <select required  {...register("id_Genre")} className='block w-full border-gray-300 rounded-lg' >
                <option value={""} >Choose a Genre</option>
                  {
                  genre.length > 0  ? genre.map((item : ifGenre) =>  <option key={item._id} value={item._id} >{item.name}</option> ) : ""
                  }
                </select>
              </div>
              <div  >
              <label  className="block mb-2 font-bold text-sm  text-gray-500 dark:text-white">Select Artists</label>
                <select required  {...register("id_Artists")} className='block w-full border-gray-300 rounded-lg' >
                <option value={""} selected>Choose a Artists</option>
                  {
                     artist.length > 0 ? artist.map((item : IArtist) => <option value={item._id} >{item.name}</option>) : ""
                  }
                </select>
              </div>
            </div>
           </div>
           <div className='w-full h-[5%] flex'>
           <LoadingButtonCl type='submit'  loading={loading} sx={{"& .css-lufg7v-MuiButtonBase-root-MuiButton-root-MuiLoadingButton-root.MuiLoadingButton-loading":{
            color : 'white'
           }}} >Thêm mới</LoadingButtonCl>
           <Link to={"/admin/listsong"} className='bg-purple-500 text-white w-[150px] text-center h-[90%] py-2 px2 rounded-[4px] ml-2 hover:opacity-[0.9]' >Danh sách nhạc</Link>
           </div>
          </Box>
         </Box>
         <Box sx={{ width : "35%", height : "100%" }} >
         <Box sx={{ width : "100%", mt : "10px" ,height : "10%" }} ></Box>
          <BoxUpload >
          <TextField {...register("song_image")} type="file" inputProps={{ multiple: true}} error={Boolean(errors.song_image)} helperText={errors.song_image?.message} sx={{ width : "100%", height : "100%", display :"block",
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