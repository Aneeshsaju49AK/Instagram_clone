import {  setUserProfile } from "@/redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetUserProfile = (userId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v1/user/${userId}/profile`,
          { withCredentials: true }
        );
        if (res.data.success) {
            
            
          // Dispatch the posts to Redux
          dispatch(setUserProfile(res.data.data)); // Assuming `data` contains the posts
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchUserProfile();
  }, [dispatch, userId]); // Include `dispatch` in dependency array
};

export default useGetUserProfile;
