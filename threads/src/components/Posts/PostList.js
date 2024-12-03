import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeletePost from './DeletePost';
import UpdatePost from './UpdatePost';
import './PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editingPostData, setEditingPostData] = useState({ title: '', content: '' });
  const [message, setMessage] = useState(null); // For success/error messages

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/posts');
        const sortedPosts = response.data.data.reverse(); // Reverse order for most recent posts first
        setPosts(sortedPosts);
        console.log('Posts fetched successfully:', sortedPosts); // Log posts for confirmation
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to fetch posts. Please try again later.');
      }
    };
    fetchPosts();
  }, []);

  // Handle canceling an edit
  const cancelEdit = () => {
    setEditingPostId(null);
    setEditingPostData({ title: '', content: '' });
  };

  // Handle saving updates
  const saveEdit = async (postId) => {
    const updatedData = {
      title: editingPostData.title,
      content: editingPostData.content,
    };

    try {
      await UpdatePost(postId, updatedData, setPosts);
      setMessage({ type: 'success', text: 'Post updated successfully!' });
      console.log('Post updated successfully:', { id: postId, ...updatedData }); // Log for confirmation
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update post. Please try again.' });
      console.error('Error updating post:', error);
    }

    cancelEdit();
    setTimeout(() => setMessage(null), 3000); // Clear message after 3 seconds
  };

  // Handle delete post
  const handleDelete = async (postId) => {
    try {
      await DeletePost(postId, setPosts);
      setMessage({ type: 'success', text: 'Post deleted successfully!' });
      console.log(`Post with ID ${postId} deleted successfully and removed from UI`); // Log confirmation
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete post. Please try again.' });
      console.error('Error deleting post:', error);
    }

    setTimeout(() => setMessage(null), 3000); // Clear message after 3 seconds
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="post-list-container">
      <h2>Posts</h2>

      {/* Success/Error message display */}
      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <div className="post-list">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              {editingPostId === post.id ? (
                <div className="edit-mode">
                  <input
                    type="text"
                    value={editingPostData.title}
                    onChange={(e) =>
                      setEditingPostData((prev) => ({ ...prev, title: e.target.value }))
                    }
                    placeholder="Edit title"
                  />
                  <textarea
                    value={editingPostData.content}
                    onChange={(e) =>
                      setEditingPostData((prev) => ({ ...prev, content: e.target.value }))
                    }
                    placeholder="Edit content"
                  ></textarea>
                  <button className="save-button" onClick={() => saveEdit(post.id)}>
                    Save
                  </button>
                  <button className="cancel-button" onClick={cancelEdit}>
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <h3>{post.Title || 'Untitled Post'}</h3>
                  <div className="post-content">
                    {post.Content &&
                      post.Content.map((contentObj, index) =>
                        contentObj.children.map((child, childIndex) => (
                          <span key={`${index}-${childIndex}`}>{child.text}</span>
                        ))
                      )}
                  </div>
                  <button
                    className="edit-button"
                    onClick={() => {
                      setEditingPostId(post.id);
                      setEditingPostData({ title: post.Title, content: post.Content?.[0]?.children?.[0]?.text || '' });
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;