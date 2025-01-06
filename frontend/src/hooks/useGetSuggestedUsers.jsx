import { setSuggestedUsers } from "@/redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const userGetSuggestedUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/v1/user/suggested",
          { withCredentials: true }
        );
        if (res.data.success) {
            
            
          // Dispatch the posts to Redux
          dispatch(setSuggestedUsers(res.data.data)); // Assuming `data` contains the posts
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchSuggestedUsers();
  }, [dispatch]); // Include `dispatch` in dependency array
};

export default userGetSuggestedUsers;
