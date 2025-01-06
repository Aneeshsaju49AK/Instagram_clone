import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Bookmark, MessageCircle, MoreHorizontal, Send, } from 'lucide-react'
import { Button } from './ui/button'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from './CommentDialog'
import { Input } from './ui/input'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setPosts, setSelectedPost } from '@/redux/postSlice'
import { Badge } from './ui/badge'


const Post = ({ post }) => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const { user } = useSelector(store => store.auth);
  const { posts } = useSelector(store => store.post);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
  const [countLike, setCountLike] = useState(post.likes.length);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments)


  const commentHandler = async (postId) => {
    try {
      const res = await axios.post(`http://localhost:4000/api/v1/post/${postId}/comment`, { comment }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        const updatedPostComment = [ res.data.newComment ,...comments]
        setComments(updatedPostComment);

        const updatedPostComments = posts.map(p => p._id === postId ? { ...p, comments: updatedPostComment } : p);
        dispatch(setPosts(updatedPostComments));
        toast.success(res.data.message);
        setComment("");
        
      }

    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        // Handle other errors (e.g., network errors)
        toast.error("Something went wrong. Please try again.");
      }
    }
  }
  const changeEventHandler = (e) => {

    const inputText = e.target.value;
    console.log(inputText);

    if (inputText.trim()) {
      setComment(inputText);
    } else {
      setComment("");
    }


  }

  const likedOrDislikeHandler = async (postId) => {
    try {
      const action = liked ? "dislike" : "like";
      const res = await axios.get(`http://localhost:4000/api/v1/post/${postId}/${action}`, { withCredentials: true });
      if (res.data.success) {
        const updatedLikes = liked ? countLike - 1 : countLike + 1;
        setCountLike(updatedLikes);
        setLiked(!liked);
        const updatedPostLikeStatus = posts.map(p =>
          p._id === postId ? {
            ...p, likes: liked ? p.likes.filter(id => id !== user._id) : [...p.likes, user._id]
          } : p
        );
        dispatch(setPosts(updatedPostLikeStatus));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);

    }
  }



  const deletePostHandler = async () => {
    try {

      const res = await axios.delete(`http://localhost:4000/api/v1/post/delete/${post?._id}`, { withCredentials: true });
      if (res.data.success) {
        const updatedPostData = posts.filter((postItem) => postItem?._id !== post?._id);
        dispatch(setPosts(updatedPostData));
        setIsDialogOpen(false)
        toast.success(res.data.message);
      }

    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        // Handle other errors (e.g., network errors)
        toast.error("Something went wrong. Please try again.");
      }
    }
  }

  return (
    <div className='w-full my-8 max-w-sm mx-auto'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Avatar >
            <AvatarImage src={post.author?.profilePicture} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='flex gap-2'>
          <h1>{post.author?.username}</h1>
           {
            user?._id === post?.author._id &&  <Badge variant="secondary" >Author</Badge>
           }
          </div>
         
          
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
          <DialogTrigger asChild>
            <MoreHorizontal className='cursor-pointer' onClick={() => setIsDialogOpen(true)} />
          </DialogTrigger>
          <DialogContent className='flex flex-col items-center text-sm text-center'>
            <Button variant='ghost' className='cursor-pointer w-fit text-[#ED4956] font-bold'>Unfollow</Button>
            <Button variant='ghost' className='cursor-pointer w-fit '>Add to favorites</Button>
            {

              user && user?._id === post?.author._id && <Button onClick={deletePostHandler} variant='ghost' className='cursor-pointer w-fit '>Delete</Button>
            }




          </DialogContent>
        </Dialog>

      </div>
      <img className='rounded-sm my-2 w-full aspect-square object-cover' src={post.image}
        alt="Post_img" />

      <div className='flex items-center justify-between my-2'>
        <div className='flex items-center gap-3'>
          {
            liked ? <FaHeart onClick={() => likedOrDislikeHandler(post?._id)} size={"22px"} className='cursor-pointer text-red-600' /> : <FaRegHeart onClick={() => likedOrDislikeHandler(post?._id)} size={"22px"} className='cursor-pointer hover:text-gray-600' />
          }

          <MessageCircle onClick={() => { dispatch(setSelectedPost(post)); setOpenComment(true); }} className='cursor-pointer hover:text-gray-600' />
          <Send className='cursor-pointer hover:text-gray-600' />
        </div>
        <Bookmark className='cursor-pointer hover:text-gray-600' />
      </div>
      <span className='font-medium block mb-2'>{countLike} likes</span>
      <p>
        <span className='font-medium mr-2'>{post.author?.username}</span>
        {post.caption}
      </p>
      {
        comments.length > 0 && (
          <span onClick={() => { dispatch(setSelectedPost(post)); setOpenComment(true); }} className='cursor-pointer text-sm text-gray-400'>view all {comments.length +1} comments</span>
        )
      }

      <CommentDialog openComment={openComment} setOpenComment={setOpenComment} setSelectedPost={post} commentHandler={commentHandler} comment={comment} setComment={setComment}/>
      <div className='flex items-center justify-between'>
        {
          !openComment && <Input
          type="text"
          name="email"
          value={comment}
          onChange={changeEventHandler}
          className="focus-visible:ring-transparent mx-2 my-2"
          placeholder= "add comment"
        />
        }
        {
          comment && <span onClick={() => commentHandler(post._id)} className='cursor-pointer text-[#3BADF8]'>Post</span>
        }

      </div>
    </div>
  )
}

export default Post
