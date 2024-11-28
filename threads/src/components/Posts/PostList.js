import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeletePost from './DeletePost'; // Import DeletePost
import './PostList.css'; // Import the CSS for styling

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/posts');
        const sortedPosts = response.data.data.reverse(); // Reverse the order to show most recent on top
        setPosts(sortedPosts); // Set the state with the sorted posts
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

              {/* Delete Button */}
              <button
                className="delete-button"
                onClick={() => DeletePost(post.id, setPosts)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
