import LoadingButton from "@mui/lab/LoadingButton";
import { styled, Box, TextField, Typography } from "@mui/material";


export const BoxProduct = styled(Box)(() => ({
    width : "100%",
    height : "16%"
}))
export const TypographySong = styled(Typography)(() => ({
    padding : "8px 0px"
}))

export const BoxUpload = styled(Box)(() => ({
    width : "100%",
    height: "35%",
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
    borderRadius:" 0.5rem",
    borderWidth: "2px",
    borderStyle: "dashed",
    opacity : 1,
    borderColor: "rgb(209 213 219 / var(--tw-border-opacity))",
    position : "relative",
}))
export const InputUploadImage = styled(TextField)(() => ({
    display :"block",
    position : "absolute",
    cursor: "pointer",
    opacity: 0,
    inset : "0px",
    fontSize : "100%",
    "& .MuiInputBase-input" : {
      width : "473px",
      height : "260px"
    },
    input: {
        "&:hover": {
            cursor: "pointer",
        }
      }
}))
export const LoadingButtonCl = styled(LoadingButton)(() => ({
    color: "white",
    backgroundColor: '#9061F9',
    width: '110px',
    height: '90%',
    ":hover": {
        backgroundColor: '#9061F9',
        color: "white",
        opacity: 0.9
    }
}));
export const LoadingButtonGenre = styled(LoadingButton)(() => ({
    color: "white",
    backgroundColor: '#9061F9',
    width: '110px',
    height: '48px',
    ":hover": {
        backgroundColor: '#9061F9',
        color: "white",
        opacity: 0.9
    }
}))
    
