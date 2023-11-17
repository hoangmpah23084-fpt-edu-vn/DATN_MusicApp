/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect } from 'react'
import Title from '../Title';
import { Box, Button, TextField, Typography, styled } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ifGenre, validateGenre } from '../Interface/validateAlbum';
import { Link, useParams } from 'react-router-dom';
import { getOneGenre, updateGenre } from '@/store/Reducer/genreReducer';
import { useAppDispatch } from '@/store/hooks';
import { LoadingButtonGenre } from '@/Mui/Component/Product';
const MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #5145CD 30%, #5145CD 90%)',
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 48,
    padding: '0 30px',
  });
const UpdateGenre = () => {
    const [genre , setGenre] = React.useState<ifGenre>();
    const [loading , setLoading] = React.useState(false);
    const {id} = useParams<{id ?: string}>();
    const dispatch = useAppDispatch();
    const {register, handleSubmit, reset, formState : {errors}} = useForm<ifGenre>({
        resolver : yupResolver(validateGenre)
    });
    useEffect( () => {
        if (id) {
            getOneGenre(id).then(({data}) => {
                console.log(data);
                setGenre(data)
            }).catch((error) => console.error(error));
        }
    },[id])
    useEffect(() => {
        return reset(genre);
    },[reset, genre])

    const handSubmitForm = (value : ifGenre) => {
      setLoading(true)
      void  dispatch(updateGenre(value))
      setLoading(false)
      alert("Cập nhật thành công")
    }
  return  <>
  <Title Title='Cập Nhật Thể Loại' />
  <Box sx={{ width : "100%" , height : "500px" }} >
      <form action="" style={{width : "100%", height : "100%"}} onSubmit={handleSubmit(handSubmitForm)} >
          <Box sx={{ width : "100%", height : "100px" }} ></Box>
          <Box sx={{ width : "100%" }} >
              <Typography sx={{ paddingBottom : "10px" }} >Name Genre</Typography>
              <TextField sx={{ width : "100%" }} {...register("name")} helperText={errors.name?.message} placeholder='Inter Name Genre' />
          </Box>
          <Box sx={{ width : "20%", display: 'flex', gap: "10px", marginTop: '20px' }} >
            <LoadingButtonGenre className='h-[48px] bg-red-700' type='submit' loading={loading} sx={{"& .css-lufg7v-MuiButtonBase-root-MuiButton-root-MuiLoadingButton-root.MuiLoadingButton-loading":{
            color : 'white'
           }}} >Thêm mới</LoadingButtonGenre>
           <Link to={"/admin/listgenre"} className='bg-purple-500 text-white w-[170px] text-center h-[100%] py-3 px2 rounded-[4px] ml-2 hover:opacity-[0.9]' >Danh sách thể loại</Link>
           </Box>
      </form>
  </Box>
  </>
}
export default UpdateGenre;