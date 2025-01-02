import React from 'react'
import { Dialog, DialogContent } from './ui/dialog'

const CommentDialog = ({openComment, setOpenComment}) => {
  return (
    <div>
      <Dialog open={openComment}>
        <DialogContent onInteractOutside={()=> setOpenComment(false)}>
        <img className='rounded-sm my-2 w-full aspect-square object-cover' src="https://images.unsplash.com/photo-1725126210190-497eb2cfb6cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8"
        alt="Post_img" 
        />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CommentDialog
