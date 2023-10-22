/* eslint-disable @typescript-eslint/no-misused-promises */
import Title from '../Title'
import { Box, Button, TextField, Typography } from '@mui/material'
import { styled } from "@mui/styles";
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ifAlbum, validateAlbum } from "../Interface/validateAlbum";
import { useAppDispatch } from '@/store/hooks';
import { addAlbum } from '@/store/Reducer/albumReducer';


const MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #5145CD 30%, #5145CD 90%)',
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 48,
    padding: '0 30px',
  });

const AddAlbum = () => {
    const {register, handleSubmit, formState : {errors}} = useForm<ifAlbum>({
        resolver : yupResolver(validateAlbum)
    });
    const dispatch = useAppDispatch();
    const handSubmitForm : SubmitHandler<ifAlbum> = (value) => {
        void dispatch(addAlbum(value));
        alert("Thêm Album thành công");
    }
  return (
    <>
    <Title Title='New Album' />
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
            <Box sx={{ width : "100%" }} >
                <Typography sx={{ paddingBottom : "10px" }} >Id Artist</Typography>
                <TextField sx={{ width : "100%" }} {...register("id_artist")} helperText={errors.id_artist?.message} placeholder='Enter Artist Id' />
            </Box>
            <Box sx={{ width : "100%", marginTop : "30px" }} >
                <MyButton type='submit' variant="contained">Submit</MyButton>
            </Box>
        </form>
    </Box>
    </>
  )
}
export default AddAlbum