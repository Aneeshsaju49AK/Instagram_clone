import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Comment from './Comment'


const CommentDialog = ({ openComment, setOpenComment, commentHandler, comment, setComment, setSelectedPost }) => {
    // const [comment, setComment] = useState("");
    // const dispatch = useDispatch();
    // const {selectedPost} = useSelector(store => store.post);
    //  const [comments, setComments] = useState([])
    //  useEffect(() => {
    //     if (selectedPost) {
    //       setComments(selectedPost.comments);
    //     }
    //   }, [selectedPost]);
    console.log(setSelectedPost);

    const changeEventHandler = (e) => {

        const inputText = e.target.value;
        if (inputText.trim()) {
            setComment(inputText);
        } else {
            setComment("");
        }

    }

    // const sendMessageHandler = async (postId) => {

    //     console.log(comments);



    //     try {
    //       const res = await axios.post(`http://localhost:4000/api/v1/post/${postId}/comment`, { comment }, {
    //         headers: {
    //           'Content-Type': 'application/json'
    //         },
    //         withCredentials: true
    //       });
    //       if (res.data.success) {
    //         console.log(res.data);
    //         // console.log(res.data.newComment);



    //         const updatedPostComment = [ res.data.newComment, ...comments ]


    //         setComments(updatedPostComment);

    //         const updatedPostComments = selectedPost.map(p => p._id === postId ? { ...p, comments: updatedPostComment } : p);
    //         console.log(updatedPostComment);
    //         dispatch(setPosts(updatedPostComments))
    //         dispatch(setSelectedPost(selectedPost))
    //         toast.success(res.data.message);
    //         setComment("");
    //       }

    //     } catch (error) {
    //       if (error.response) {
    //         toast.error(error.response.data.message);
    //       } else {
    //         // Handle other errors (e.g., network errors)
    //         toast.error("Something went wrong. Please try again.");
    //       }
    //     }
    //   }
    return (
        <div>
            <Dialog open={openComment}>
                <DialogContent
                    onInteractOutside={() => setOpenComment(false)}
                    className="max-w-5xl p-0 flex flex-col max-h-[600px] overflow-hidden"
                >
                    <div className="flex h-full">
                        <div className="w-1/2">
                            <img
                                className="rounded-l-lg w-full h-full object-cover"
                                src={setSelectedPost?.image}
                                alt="Post_img"
                            />
                        </div>
                        <div className="w-1/2 flex flex-col ">
                            <div className="flex items-center justify-between p-4">
                                <div className="flex gap-3 items-center">
                                    <Link>
                                        <Avatar>
                                            <AvatarImage src={setSelectedPost?.author?.profilePicture} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </Link>
                                    <div className="flex flex-col">
                                        <Link className="font-semibold text-xs">
                                            {setSelectedPost?.author?.username}
                                        </Link>
                                        <span>{setSelectedPost?.author?.bio || "bio..."}</span>
                                    </div>
                                </div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <MoreHorizontal className="cursor-pointer" />
                                    </DialogTrigger>
                                    <DialogContent className="flex flex-col items-center text-sm text-center">
                                        <div className="cursor-pointer w-full text-[#ED4956] font-bold text-center">
                                            Unfollow
                                        </div>
                                        <div className="cursor-pointer w-full font-bold text-center">
                                            Add to favorites
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <div className="p-2 mt-3">
                                <hr />
                            </div>

                            {/* Comments section */}
                            <div className="flex-1 overflow-y-auto max-h-[300px] p-4">
                                {setSelectedPost.comments.map((comment) => (
                                    <Comment key={comment._id} comment={comment} />
                                ))}
                            </div>

                            {/* Add comment input */}
                            <div className="p-4">
                                <div className="flex gap-2 items-center">
                                    <Input
                                        onChange={changeEventHandler}
                                        value={comment}
                                        type="text"
                                        placeholder="Add a comment..."
                                        className="w-full outline-none border border-gray-300 p-2 rounded"
                                    />
                                    <Button
                                        disabled={!comment.trim()}
                                        onClick={() => commentHandler(setSelectedPost._id)}
                                        variant="outline"
                                    >
                                        Send
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>

    )
}

export default CommentDialog
