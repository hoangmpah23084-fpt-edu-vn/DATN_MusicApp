import './App.css'
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/index.tsx";
import { ThemeProvider } from '@mui/material';
import theme from './Mui/Index.ts';

function App() {

  return (
    <>
    <ThemeProvider theme={theme}>
    <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>

    </>
  )
}

export default App
