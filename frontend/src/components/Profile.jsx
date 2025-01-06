import useGetUserProfile from '@/hooks/useGetUserProfile'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AtSign } from 'lucide-react';

const Profile = () => {

    const params = useParams();
    const userId = params.id;
    useGetUserProfile(userId);

    const { userProfile } = useSelector(store => store.auth);
    const isLoggedInUserProfle = true;
    const isFollowing = true;

    return (
        <div className='flex max-w-6xl justify-center mx-auto pl-32 '>
            <div className='flex flex-col gap-20 p-8'>
                <div className='grid grid-cols-2 '>
                    <section className='flex items-center justify-center '>
                        <Avatar className='h-32 w-32'>
                            <AvatarImage src={userProfile?.profilePicture} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </section>
                    <section className=''>
                        <div className='flex  gap-5'>
                            <span>{userProfile?.username}</span>
                            {
                                isLoggedInUserProfle ? (
                                    <div className='flex gap-1'>
                                        <Button variant="secondary" className="hover:bg-gray-200 h-8">Edit Profile</Button>
                                        <Button variant="secondary" className="hover:bg-gray-200 h-8">View Archive</Button>
                                        <Button variant="secondary" className="hover:bg-gray-200 h-8">Ad tools</Button>
                                    </div>
                                ) : (

                                    isFollowing ? (
                                        <>
                                        <Button variant="secondary" className=" h-8">UnFollow</Button>
                                        <Button variant="secondary" className=" h-8">Message</Button>
                                        </>

                                    ):(
                                        <Button  className="hover:bg-[#3192d2] bg-[#0095F6] h-8">Follow</Button>
                                    )
                                    
                                )
                            }

                        </div>
                        <div className='flex items-center gap-4'>
                            <p>  <span className='font-semibold' >{userProfile?.post.length}</span> posts</p>
                            <p> <span className='font-semibold' >{userProfile?.followers.length}</span>followers </p>
                            <p> <span className='font-semibold' >{userProfile?.following.length}</span> following</p>
                        </div>
                        <div className='flex flex-col'>
                            <span className='font-semibold'>{userProfile?.bio || "bio here"}</span>
                            <Badge className="w-fit" variant="secondary" > <AtSign/> <span className='p-1'>{userProfile?.username}</span> </Badge>
                        </div>
                    </section>
                   
                </div>
                <div className='border-t border-t-gray-200'>
                    <div className='flex items-center justify-center gap-10 text-center'>
                        <span className='py-3 cursor-pointer'>
                            POSTS
                        </span>
                        <span className='py-3 cursor-pointer'>
                            SAVED
                        </span>
                        <span className='py-3 cursor-pointer'>
                            REELS
                        </span>
                        <span className='py-3 cursor-pointer'>
                            TABS
                        </span>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Profile
