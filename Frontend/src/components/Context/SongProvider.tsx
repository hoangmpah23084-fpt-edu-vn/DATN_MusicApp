import React, { createContext } from 'react'

interface IFSongContext{
    linkSong: string,
    indexLink: number,
    setIndexLink: React.Dispatch<React.SetStateAction<number>>,
    data: Array<IfData> | null,
    setData: React.Dispatch<React.SetStateAction<Array<IfData> | null>>,
    setLinkSong: React.Dispatch<React.SetStateAction<string>>,
    globalPause: boolean, 
    setGlobalPause: React.Dispatch<React.SetStateAction<boolean>>
}
export const SongContext = createContext<IFSongContext>({
  linkSong : "",
  indexLink: 0, // default index 0 
  data: null,
  setData : (e) => e,
  setIndexLink : (e) => e,
  setLinkSong : (e) => e,
  globalPause : false,
  setGlobalPause : (e) => e,
});
type Props ={
    children : React.ReactNode
}
interface IfData {
  id : number,
  link :string,
  title :string,
  state : boolean,
}

const SongProvider = ({children} : Props) => {
    const [linkSong, setLinkSong] = React.useState<string>("");
    const [data, setData] = React.useState<Array<IfData> | null>(null);
    const [indexLink, setIndexLink] = React.useState<number>(0);
    const [globalPause, setGlobalPause] = React.useState<boolean>(false);
  return (
    <SongContext.Provider value={{linkSong,indexLink, data, setData, setIndexLink,setLinkSong,setGlobalPause,globalPause}} >
        {children}
    </SongContext.Provider>
  )
}
export const SongStateContext = () => React.useContext(SongContext);

export default SongProvider