import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('http://localhost:1337/api/posts');
      setPosts(response.data.data); // Adjust based on Strapi's response
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.attributes.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
