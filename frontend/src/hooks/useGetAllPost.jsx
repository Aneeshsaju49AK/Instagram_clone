import { setPosts } from "@/redux/postSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllPost = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/v1/post/all",
          { withCredentials: true }
        );
        if (res.data.success) {
          // Dispatch the posts to Redux
          dispatch(setPosts(res.data.data)); // Assuming `data` contains the posts
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchAllPost();
  }, [dispatch]); // Include `dispatch` in dependency array
};

export default useGetAllPost;
