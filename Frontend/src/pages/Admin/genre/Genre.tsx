/* eslint-disable @typescript-eslint/no-misused-promises */
import Title from '../Title'
import { Box, Button, TextField, Typography } from '@mui/material'
import { styled } from "@mui/styles";
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ifAlbum, validateGenre } from "../Interface/validateAlbum";
import { useAppDispatch } from '@/store/hooks';
import { addGenre } from '@/store/Reducer/genreReducer';


const MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #5145CD 30%, #5145CD 90%)',
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 48,
    padding: '0 30px',
  });

const Genre = () => {
    const {register, handleSubmit, formState : {errors}} = useForm<ifAlbum>({
        resolver : yupResolver(validateGenre)
    });
    const dispatch = useAppDispatch();
    const handSubmitForm : SubmitHandler<ifAlbum> = (value) => {
        void dispatch(addGenre(value));
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
            <Box sx={{ width : "100%", marginTop : "30px" }} >
                <MyButton type='submit' variant="contained"  >Submit</MyButton>
            </Box>
        </form>
    </Box>
    </>
  )
}
export default Genre