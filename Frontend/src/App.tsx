import './App.css'
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/index.tsx";
import { ThemeProvider } from '@mui/material';
import theme from './Mui/Index.ts';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
function App() {

  return (
    <>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </>
  )
}

export default App
