import React, { createContext } from 'react'

interface IFSongContext{
    linkSong: string, 
    setLinkSong: React.Dispatch<React.SetStateAction<string>>
}
export const SongContext = createContext<IFSongContext>({
  linkSong : "",
  setLinkSong : (e) => e,
});
type Props ={
    children : React.ReactNode
}
const SongProvider = ({children} : Props) => {
    const [linkSong, setLinkSong] = React.useState<string>("");
  return (
    <SongContext.Provider value={{linkSong,setLinkSong}} >
        {children}
    </SongContext.Provider>
  )
}
export const SongStateContext = () => React.useContext(SongContext);

export default SongProvider