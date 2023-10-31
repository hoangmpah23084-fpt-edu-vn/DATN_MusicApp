import { createTheme } from "@mui/material";

const theme = createTheme({
    components: {
      MuiListItemButton : {
        styleOverrides : {
          root : {
            ":focus" : {
              outline: "none !important"
            }
          }
        }
      },
      MuiFormHelperText : {
        styleOverrides :{
          root : {
            color : "red"
          }
        }
      }
    }
  });
export default theme