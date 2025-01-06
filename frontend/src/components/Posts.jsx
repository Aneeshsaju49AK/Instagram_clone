import React from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'

const Posts = () => {
  const {posts} = useSelector((store)=>store.post);
  
  
  return (
    <div className='"flex-1 overflow-y-auto max-h-screen w-1/2 p-4"'>
      
        {
            // posts.data.map((post) => <Post key={post._id}  post={post}/> )  
            posts.map((post)=> <Post key={post._id} post={post} />)
        }
    </div>
  )
}

export default Posts