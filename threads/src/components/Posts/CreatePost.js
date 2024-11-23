import React, { useState } from 'react';
import axios from 'axios';
import './CreatePost.css';
const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading state
    setMessage(''); // Clear any previous messages

    try {
        const response = await axios.post('http://localhost:1337/api/posts', {
          data: {
            Title: title,
            Content: content ? [{ type: 'paragraph', children: [{ type: 'text', text: content }] }] : null,
            publishedAt: new Date().toISOString(),
          },
        });

      // Handle successful post creation
      console.log('Post created successfully:', response.data);
      setMessage('Post successfully created and published!');
      setTitle('');
      setContent('');
    } catch (error) {
      // Handle errors
      console.error('Error creating post:', error);
      setMessage('Failed to create the post. Please try again.');
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content ? content : ''}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
      {message && <p>{message}</p>} {/* Display success or error message */}
    </div>
  );
};

export default CreatePost;

