import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Bookmark, MessageCircle, MoreHorizontal, Send, } from 'lucide-react'
import { Button } from './ui/button'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from './CommentDialog'
import { Input } from './ui/input'

const Post = () => {
  const [text, setText] = useState("");
  const [openComment, setOpenComment] = useState(false);
  const changeEventHandler = (e) => {
    
    const inputText = e.target.value;
    if(inputText.trim()){
      setText(inputText);
    }else{
      setText("");
    }

  }
  return (
    <div className='w-full my-8 max-w-sm mx-auto bg-red-500'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-5'>
          <Avatar >
            <AvatarImage src="https://avatars.githubusercontent.com/u/123374913?s=48&v=4" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1>Username</h1>

        </div>
        <Dialog >
          <DialogTrigger asChild>
            <MoreHorizontal className='cursor-pointer' />
          </DialogTrigger>
          <DialogContent className='flex flex-col items-center text-sm text-center'>
            <Button variant='ghost' className='cursor-pointer w-fit text-[#ED4956] font-bold'>Unfollow</Button>
            <Button variant='ghost' className='cursor-pointer w-fit '>Add to favorites</Button>
            <Button variant='ghost' className='cursor-pointer w-fit '>Delete</Button>
          </DialogContent>
        </Dialog>

      </div>
      <img className='rounded-sm my-2 w-full aspect-square object-cover' src="https://images.unsplash.com/photo-1725126210190-497eb2cfb6cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8"
        alt="Post_img" />

      <div className='flex items-center justify-between my-2'>
        <div className='flex items-center gap-3'>
          <FaHeart size={"22px"} className='cursor-pointer hover:text-gray-600' />
          <MessageCircle onClick={()=> setOpenComment(true)} className='cursor-pointer hover:text-gray-600' />
          <Send className='cursor-pointer hover:text-gray-600' />
        </div>
        <Bookmark className='cursor-pointer hover:text-gray-600' />
      </div>
      <span className='font-medium block mb-2'>1k likes</span>
      <p>
        <span className='font-medium mr-2'>Username</span>
        caption
      </p>
      <span onClick={()=> setOpenComment(true)} className='cursor-pointer text-sm text-gray-400'>view all comments</span>
      <CommentDialog openComment={openComment} setOpenComment={setOpenComment} />
      <div className='flex items-center justify-between'>
        <Input
          type="text"
          name="email"
          value={text}
          onChange={changeEventHandler}
          className="focus-visible:ring-transparent mx-2 my-2"
        />
        {
           text && <span className='text-[#3BADF8]'>Post</span>
        }
        
      </div>
    </div>
  )
}

export default Post
