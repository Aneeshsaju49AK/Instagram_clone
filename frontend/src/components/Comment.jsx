import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Comment = ({comment}) => {
  return (
    <div className='my-2'>
        <div className='flex gap-3'>
            <Avatar>
                <AvatarImage src={comment?.author?.profilePicture} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className='text-gray-600'>{comment?.author?.username} <span className=' text-black'>{comment?.text}</span></h1>
        </div>
      
    </div>
  )
}

export default Comment
