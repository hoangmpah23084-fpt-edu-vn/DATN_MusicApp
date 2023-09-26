import React from 'react'

type Props = {
    Title : string
}

const Title = ({Title} : Props) => {
  return (
    <div className='w-full h-14  flex justify-start items-center ' >
        <h1 className='text-3xl font-bold' >{Title}</h1>
    </div>
  )
}
export default Title