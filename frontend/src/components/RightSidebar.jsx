import React from 'react'
import { Avatar, AvatarFallback } from './ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import SuggestedUsers from './SuggestedUsers'


const RightSidebar = () => {
  const {user} = useSelector(store => store.auth);
  return (
    <div className='w-fit my-10 pr-36 '>
      <div className='flex items-center gap-3'>
        <Link>
        <Avatar>
          <AvatarImage src={user?.profilePicture}/>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        </Link>
        
        <div className='flex items-start  flex-col'>
          <h1 className='font-semibold text-sm'>{user?.username}</h1>
          <span className='text-gray-600 text-sm'>{user?.bio}</span>
        </div>
      </div>
      <SuggestedUsers/>
    </div>
  )
}

export default RightSidebar
