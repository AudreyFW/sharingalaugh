import React from 'react';
import {MdOutlineVideocamOff} from 'react-icons/md';
import {BiCommentX}  from 'react-icons/bi';


interface IProps{
    text: string
}

const NoResults = ({text}:IProps) => {
  return (
    <div>
      <div className='flex flex-col justify-center items-center h-full text-black w-full'>
        <p className='text-8xl'>
          {text ==='No comments yet !' ?
           <BiCommentX /> : 
          <MdOutlineVideocamOff />}
        </p>
        <p className='text-2xl text-center'>{text}</p>

      </div>
    </div>
  )
}

export default NoResults