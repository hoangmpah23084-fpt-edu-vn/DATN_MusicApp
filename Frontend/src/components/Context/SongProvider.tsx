import { ifSong } from '@/pages/Admin/Interface/ValidateSong';
import { handGetSong } from '@/store/Reducer/Song';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { createContext } from 'react'

interface IFSongContext{
    linkSong: string,
    indexLink: number,
    setIndexLink: React.Dispatch<React.SetStateAction<number>>,
    dataSong: Array<ifSong> | [],
    setDataSong: React.Dispatch<React.SetStateAction<Array<ifSong> | []>>,
    setLinkSong: React.Dispatch<React.SetStateAction<string>>,
    globalPause: boolean, 
    setGlobalPause: React.Dispatch<React.SetStateAction<boolean>>
}
export const SongContext = createContext<IFSongContext>({
  linkSong: "",
  indexLink: 0,
  dataSong: [],
  setDataSong: (e) => e,
  setIndexLink: (e) => e,
  setLinkSong: (e) => e,
  globalPause: false,
  setGlobalPause: (e) => e,
});
type Props ={
    children : React.ReactNode
}
const SongProvider = ({children} : Props) => {
    const [linkSong, setLinkSong] = React.useState<string>("");
    const [dataSong, setDataSong] = React.useState<Array<ifSong> >([]);
    const [indexLink, setIndexLink] = React.useState<number>(0);
    const [globalPause, setGlobalPause] = React.useState<boolean>(false);
    
  return (
    <SongContext.Provider value={{linkSong,indexLink, dataSong, setDataSong, setIndexLink,setLinkSong,setGlobalPause,globalPause}} >
        {children}
    </SongContext.Provider>
  )
}
export const SongStateContext = () => React.useContext(SongContext);

export default SongProvider