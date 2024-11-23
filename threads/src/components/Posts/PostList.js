import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PostList.css'; // Import the CSS for styling

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/posts');
        setPosts(response.data.data); // Access the "data" array from the response
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to fetch posts. Please try again later.');
      }
    };
    fetchPosts();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="post-list-container">
      <h2>Posts</h2>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <div className="post-list">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <h3>{post.Title || 'Untitled Post'}</h3>
              {/* Safely access the content text */}
              <div className="post-content">
                {post.Content &&
                  post.Content.map((contentObj, index) =>
                    contentObj.children.map((child, childIndex) => (
                      <span key={`${index}-${childIndex}`}>{child.text}</span>
                    ))
                  )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
