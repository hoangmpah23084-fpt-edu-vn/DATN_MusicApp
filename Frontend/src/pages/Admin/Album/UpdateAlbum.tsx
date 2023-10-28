/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, useEffect } from 'react'
import Title from '../Title';
import { Box, Button, TextField, Typography, styled } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ifAlbum, validateAlbum } from '../Interface/validateAlbum';
import { Link, useParams } from 'react-router-dom';
import { getOneAlbum, updateAlbum } from '@/store/Reducer/albumReducer';
import { useAppDispatch } from '@/store/hooks';

const MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #5145CD 30%, #5145CD 90%)',
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 48,
    padding: '0 30px',
  });

const UpdateAlbum = () => {
    const [album , setAlbum] = useState<ifAlbum>();
    const {id} = useParams<{id ?: string}>();
    const dispatch = useAppDispatch();
    const {register, handleSubmit, reset, formState : {errors}} = useForm<ifAlbum>({
        resolver : yupResolver(validateAlbum)
    });
    useEffect( () => {
        if (id) {
            getOneAlbum(id).then(({data}) => {
                console.log(data);
                setAlbum(data)
            }).catch((error) => console.error(error));
        }
    },[id])
    useEffect(() => {
        return reset(album);
    },[reset, album])

    const handSubmitForm = (value : ifAlbum) => {
      void  dispatch(updateAlbum(value))
      alert("Cập nhật Album thành công")
    }
  return  <>
  <Title Title='Update Album' />
  <Box sx={{ width : "100%" , height : "500px" }} >
      <form action="" style={{width : "100%", height : "100%"}} onSubmit={handleSubmit(handSubmitForm)} >
          <Box sx={{ width : "100%", height : "100px" }} >
              <Typography variant='h6' sx={{ fontWeight : "700" }} >Basic Information</Typography>
              <Typography >Section to config basic product information</Typography>
          </Box>
          <Box sx={{ width : "100%" }} >
              <Typography sx={{ paddingBottom : "10px" }} >Name Album</Typography>
              <TextField sx={{ width : "100%" }} {...register("album_name")} helperText={errors.album_name?.message} placeholder='Enter Name Album' />
          </Box>
          <Box sx={{ width : "100%", marginTop : "30px" }} >
            <button
                type="submit"
                className="bg-purple-500 text-white w-[100px] h-[50px] rounded-lg mr-[10px]"
            >
                Submit
            </button>
            <Button variant="outlined" color="success" className="h-[50px]" >
              <Link to={'/admin/list-album'}>List Album</Link>
            </Button>
          </Box>
      </form>
  </Box>
  </>
}
export default UpdateAlbum;