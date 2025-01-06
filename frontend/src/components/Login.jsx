import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '@/redux/authSlice.js'

const Login = () => {

    const [input, setInput] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }
    const signupHandler = async (e) => {
        e.preventDefault();
        
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:4000/api/v1/user/login', input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
               
                dispatch(setAuthUser(res.data.data))
                navigate('/');
                toast.success(res.data.message);
                setInput({
                    
                    email: "",
                    password: ""
                })
            }
        } catch (error) {
            
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                // Handle other errors (e.g., network errors)
                toast.error("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }

    }
    return (
        <div className='w-screen h-screen flex items-center justify-center bg-zinc-200'>
            <form onSubmit={signupHandler} className='shadow-lg flex flex-col gap-5 p-10 bg-white' action="">
                <div>
                    <h1 className='text-center font-bold text-xl'>LOGO</h1>
                    <p className='text-sm text-center'>Login to see photos & video from your friends</p>
                </div>
                <div >
                    <Label className="font-medium">Email</Label>
                    <Input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-transparent my-2"
                    />
                </div>
                <div>
                    <Label className="font-medium">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-transparent my-2"
                    />
                </div>
                {
                    loading? (
                        <Button>
                            <Loader2 className='m-2 h-4 w-4 animate-spin'/>
                            please wait...
                        </Button>
                    ):(
                        <Button type="submit" >Login</Button>
                    )
                }
                
                <span className='text-center'>Dosen't have an account? <Link to='/signup' className='text-blue-600' >Login</Link></span>
            </form>
        </div>
    )
}

export default Login
