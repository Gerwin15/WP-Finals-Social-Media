import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`http://localhost:1337/api/posts/${id}`);
      setPost(response.data.data); // Adjust based on Strapi's response
    };
    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h2>{post.attributes.title}</h2>
      <p>{post.attributes.content}</p>
    </div>
  );
};

export default PostDetails;