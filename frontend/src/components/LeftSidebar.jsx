import axios from 'axios'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const sidebarItems = [
    { icon: <Home />, text: 'Home' },
    { icon: <Search />, text: 'Search' },
    { icon: <TrendingUp />, text: 'Explore' },
    { icon: <MessageCircle />, text: 'Messages' },
    { icon: <Heart />, text: 'Notifications' },
    { icon: <PlusSquare />, text: 'Create' },
    {
        icon: (
            <Avatar className='w-6 h-6'>
                <AvatarImage src="https://avatars.githubusercontent.com/u/123374913?s=48&v=4" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        ),
        text: "Profile"
    },

    { icon: <LogOut />, text: 'Logout' },

]
const LeftSidebar = () => {
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
          const res = await axios.get('http://localhost:4000/api/v1/user/logout',{withCredentials:true});
          if(res.data.success){
            navigate('/login');
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
    const sidebarHandler = (textType) =>{
        if(textType === 'Logout') logoutHandler();
    }
    return (
        <div className='fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen'>
            <div className='flex flex-col'>
                <h1 className='my-10 pl-3 font-bold text-xl'>LOGO</h1>
                <div>
                    {
                        sidebarItems.map((item, index) => {
                            return (
                                <div onClick={()=> sidebarHandler(item.text)} key={index} className='flex items-center gap-4 relative hover:bg-green-100 cursor-pointer rounded-lg p-3 my-5'>
                                    {item.icon}
                                    <span>{item.text}</span>
                                </div>
                            )
                        })
                    }
                </div>

            </div>

        </div>
    )
}

export default LeftSidebar
