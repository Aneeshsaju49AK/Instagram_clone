import Signup from './components/Signup';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import MainLayout from './components/MainLayout';
import Profile from './components/Profile';


const browserRouter = createBrowserRouter([{
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Home />
    },
    {
      path:'/profile/:id',
      element: <Profile/>
    }
  ]
},
{
  path: '/signup',
  element: <Signup />
}, {
  path: '/login',
  element: <Login />
}
])
function App() {


  return (
    <>
      <RouterProvider router={browserRouter} />

    </>
  )
}

export default App
