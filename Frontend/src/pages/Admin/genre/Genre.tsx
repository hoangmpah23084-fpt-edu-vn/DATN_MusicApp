/* eslint-disable @typescript-eslint/no-misused-promises */
import Title from '../Title'
import { Box, Button, TextField, Typography } from '@mui/material'
import { styled } from "@mui/styles";
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ifAlbum, validateGenre } from "../Interface/validateAlbum";
import { useAppDispatch } from '@/store/hooks';
import { addGenre } from '@/store/Reducer/genreReducer';
import {  LoadingButtonGenre } from '@/Mui/Component/Product';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const Genre = () => {
    const [loading , setLoading] = useState(false);
    const {register, handleSubmit, formState : {errors}} = useForm<ifAlbum>({
        resolver : yupResolver(validateGenre)
    });
    const dispatch = useAppDispatch();
    const handSubmitForm : SubmitHandler<ifAlbum> = (value) => {
        setLoading(true);
        void dispatch(addGenre(value));
        setLoading(false);
        alert("Thêm genre thành công");
    }
  return (
    <>
    <Title Title='New Genre' />
    <Box sx={{ width : "100%" , height : "500px" }} >
        <form action="" style={{width : "100%", height : "100%"}} onSubmit={handleSubmit(handSubmitForm)} >
            <Box sx={{ width : "100%", height : "100px" }} >
                <Typography variant='h6' sx={{ fontWeight : "700" }} >Basic Information</Typography>
                <Typography >Section to config basic product information</Typography>
            </Box>
            <Box sx={{ width : "100%" }} >
                <Typography sx={{ paddingBottom : "10px" }} >Name Genre</Typography>
                <TextField sx={{ width : "100%" }} {...register("name")} helperText={errors.name?.message} placeholder='Inter Name Genre' />
            </Box>
            <Box sx={{ width : "15%", display: 'flex', justifyContent: "space-around", alignItems: 'center', marginTop: '20px' }} >
            <LoadingButtonGenre className='h-[48px] bg-red-700' type='submit' loading={loading} sx={{"& .css-lufg7v-MuiButtonBase-root-MuiButton-root-MuiLoadingButton-root.MuiLoadingButton-loading":{
            color : 'white'
           }}} >Thêm mới</LoadingButtonGenre>
           <Link to={"/admin/listgenre"} className='bg-purple-500 text-white w-[150px] text-center h-[100%] py-3 px2 rounded-[4px] ml-2 hover:opacity-[0.9]' >Danh sách nhạc</Link>
           </Box>
        </form>
    </Box>
    </>
  )
}
export default Genre