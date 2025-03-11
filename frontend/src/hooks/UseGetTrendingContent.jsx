import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";

const useGetTrendingContent = () => {
  const { ContentType } = useContentStore();
  const [TrendingContent, setTrendingContent] = useState(null);

  useEffect(() => {
    const fetchTrendingContent = async () => {
      try {
        const response = await axios.get(`/api/v1/${ContentType}/trending`);
        setTrendingContent(response.data.content);
      } catch (error) {
        console.error("Error fetching trending content:", error);
      }
    };

    fetchTrendingContent(); 
  }, [ContentType]); 

  return { TrendingContent };
};

export default useGetTrendingContent;
