import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showComment, setShowComment] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:1337/api/posts/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
        setComments(response.data.comments || []); // Assuming comments are part of the post data
      } catch (error) {
        setError('Failed to fetch post data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError('Title and content are required!');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');
    setShowComment(false);

    try {
      const response = await axios.put(`http://localhost:1337/api/posts/${id}`, { title, content });
      setSuccessMessage('Post updated successfully!');
      setShowComment(true);
      setTimeout(() => {
        navigate(`/posts/${id}`);
      }, 1500); // Delay before redirect
    } catch (error) {
      setError('Failed to update post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (!newComment) {
      setError('Comment cannot be empty');
      return;
    }

    setComments([...comments, newComment]);
    setNewComment('');
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Welcome to the Home Page</h1>
        <h2>Posts</h2>
      </header>

      {loading && !successMessage && <p style={styles.loading}>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}
      {successMessage && <p style={styles.success}>{successMessage}</p>}

      {!loading && !successMessage && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="title" style={styles.label}>Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
              placeholder="Enter post title"
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="content" style={styles.label}>Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={styles.textarea}
              placeholder="Enter post content"
            />
          </div>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      )}

      {showComment && (
        <div style={styles.commentContainer}>
          <p style={styles.comment}>✅ Your post has been updated successfully!</p>
        </div>
      )}

      <div style={styles.commentsSection}>
        <h3>Comments</h3>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment, index) => (
            <div key={index} style={styles.commentCard}>
              <p>{comment}</p>
            </div>
          ))
        )}

        <form onSubmit={handleCommentSubmit} style={styles.commentForm}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            style={styles.commentInput}
            placeholder="Add a comment"
          />
          <button type="submit" style={styles.commentButton}>Comment</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    maxWidth: '800px',
    margin: '50px auto',
    backgroundColor: '#F9F9F9',
    borderRadius: '16px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Helvetica, Arial, sans-serif',
    color: '#333',
  },
  header: {
    marginBottom: '30px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#444',
    marginBottom: '8px',
  },
  input: {
    padding: '14px 20px',
    fontSize: '16px',
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
    outline: 'none',
  },
  textarea: {
    padding: '12px 18px',
    fontSize: '16px',
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    width: '100%',
    boxSizing: 'border-box',
    height: '200px',
    transition: 'border-color 0.3s',
    outline: 'none',
  },
  button: {
    backgroundColor: '#1E90FF',
    color: '#fff',
    padding: '12px 20px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    outline: 'none',
  },
  error: {
    color: '#e74c3c',
    fontSize: '14px',
    marginBottom: '15px',
  },
  success: {
    color: '#28a745',
    fontSize: '14px',
    marginBottom: '15px',
  },
  loading: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#555',
  },
  commentContainer: {
    marginTop: '20px',
    padding: '12px',
    backgroundColor: '#d4edda',
    borderRadius: '8px',
    border: '1px solid #c3e6cb',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  comment: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#155724',
  },
  commentsSection: {
    marginTop: '40px',
  },
  commentCard: {
    backgroundColor: '#F1F1F1',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '8px',
  },
  commentForm: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
  },
  commentInput: {
    padding: '10px 15px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: '10px',
    height: '100px',
    resize: 'vertical',
  },
  commentButton: {
    backgroundColor: '#1E90FF',
    color: '#fff',
    padding: '10px 15px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    outline: 'none',
  },
};

export default EditPost;