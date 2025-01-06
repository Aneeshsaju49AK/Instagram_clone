import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const SuggestedUsers = () => {
    const { suggestedUsers } = useSelector(store => store.auth);
    return (
        <div className='my-10 w-[300px]'>
            <div className='flex items-center justify-between text-sm '>
                <h1 className='font-semibold text-gray-600'>
                    Suggested for you
                </h1>
                <span className='font-medium cursor-pointer'>See All</span>
            </div>
            {
                suggestedUsers.map((user) => {
                    return (
                        <div key={user._id} className='flex items-center justify-between p-2 mt-2'>
                            <div  className='flex items-center gap-3 '>
                                <Link>
                                    <Avatar>
                                        <AvatarImage src={user?.profilePicture} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>

                                <div className='flex items-start  flex-col'>
                                    <h1 className='font-semibold text-sm'>{user?.username}</h1>
                                    <span className='text-gray-600 text-sm'>{user?.bio}</span>
                                </div>

                            </div>
                            <span  className='text-[#3BADF8] text-sm font-bold cursor-pointer hover:text-[#2b668d]'>follow</span>
                        </div>

                    )
                })
            }

        </div>
    )
}

export default SuggestedUsers
