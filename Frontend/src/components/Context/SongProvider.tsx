import React, { createContext, useContext, useState } from 'react'

interface IFSongContext{
    globalPause: boolean, 
    setGlobalPause: React.Dispatch<React.SetStateAction<boolean>>,
}
export const SongContext = createContext<IFSongContext>({
  globalPause: false,
  setGlobalPause: (e) => e,
});
type Props ={
    children : React.ReactNode
}
const SongProvider = ({children} : Props) => {
    const [globalPause, setGlobalPause] = useState<boolean>(false);
  return (
    <SongContext.Provider value={{setGlobalPause,globalPause}} >
        {children}
    </SongContext.Provider>
  )
}
export const SongStateContext = () => useContext(SongContext);

export default SongProvider