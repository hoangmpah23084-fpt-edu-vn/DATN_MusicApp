/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect } from 'react'
import Title from '../Title';
import { Box, Button, TextField, Typography, styled } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ifGenre, validateGenre } from '../Interface/validateAlbum';
import { useParams } from 'react-router-dom';
import { getOneGenre, updateGenre } from '@/store/Reducer/genreReducer';
import { useAppDispatch } from '@/store/hooks';
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
      void  dispatch(updateGenre(value))
      alert("Cập nhật thành công")
    }
  return  <>
  <Title Title='Update Genre' />
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
          <Box sx={{ width : "100%", marginTop : "30px" }} >
              <MyButton type='submit' variant="contained"  >Submit</MyButton>
          </Box>
      </form>
  </Box>
  </>
}
export default UpdateGenre;