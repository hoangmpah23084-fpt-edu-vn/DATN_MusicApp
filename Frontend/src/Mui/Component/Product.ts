import { styled, Box, TextField } from "@mui/material";


export const BoxProduct = styled(Box)(() => ({
    width : "100%",
    height : "13%"
}))
export const BoxUpload = styled(Box)(() => ({
    width : "100%",
    height: "25%",
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
    