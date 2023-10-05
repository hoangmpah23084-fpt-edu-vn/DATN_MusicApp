import './App.css'
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/index.tsx";
import { ThemeProvider } from '@mui/material';
import theme from './Mui/Index.ts';
import SongProvider from './components/Context/SongProvider.tsx';

function App() {

  return (
    <>
    <SongProvider>
    <ThemeProvider theme={theme}>
    <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
    </SongProvider>

    </>
  )
}

export default App
