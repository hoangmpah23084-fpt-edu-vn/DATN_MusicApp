import { ifSong } from '@/pages/Admin/Interface/ValidateSong';
import { handGetSong } from '@/store/Reducer/Song';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { createContext, useContext, useEffect, useState } from 'react'

interface IFSongContext{
    globalPause: boolean, 
    setGlobalPause: React.Dispatch<React.SetStateAction<boolean>>,
    currentSong: null | ifSong, 
    setCurrentSong: React.Dispatch<React.SetStateAction<ifSong | null>>,
}
export const SongContext = createContext<IFSongContext>({
  globalPause: false,
  setGlobalPause: (e) => e,
  currentSong: null ,
  setCurrentSong: (e) => e,
});
type Props ={
    children : React.ReactNode
}
const SongProvider = ({children} : Props) => {
    const [globalPause, setGlobalPause] = useState<boolean>(false);
    const current = useAppSelector(({ Song }) => Song);
    const dispatch = useAppDispatch();
    const [currentSong, setCurrentSong] = useState<ifSong | null>(null);
  
    useEffect(() => {
      async function fetchData() {
        await dispatch(handGetSong());
      }
      void fetchData();
    }, [dispatch]);
    useEffect(() => {
      if (current.song.length > 0) {
        setCurrentSong(current.song[2]);
      }
    }, [current.song]);
  return (
    <SongContext.Provider value={{setGlobalPause,globalPause, currentSong, setCurrentSong}} >
        {children}
    </SongContext.Provider>
  )
}
export const SongStateContext = () => useContext(SongContext);

export default SongProvider