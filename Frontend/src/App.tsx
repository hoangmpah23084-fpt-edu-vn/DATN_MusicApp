import './App.css'
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/index.tsx";
import { ThemeProvider } from '@mui/material';
import theme from './Mui/Index.ts';
import SongProvider from './components/Context/SongProvider.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <>
    <ToastContainer/>
    <SongProvider>
    <ThemeProvider theme={theme}>
    <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
    </SongProvider>

    </>
  )
}

export default App
