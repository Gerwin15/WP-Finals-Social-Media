import axios from 'axios';

const DeletePost = async (postId, setPosts) => {
  try {
    // Send the DELETE request to Strapi to delete the post by its ID
    const response = await axios.delete(`http://localhost:1337/api/posts/${postId}`, {
      headers: {
        // Optional: Include authentication token if needed
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    });

    if (response.status === 200 || response.status === 204) {
      console.log('Post deleted successfully');
      // After successful deletion, update the state to remove the post from the list
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    } else {
      console.error('Failed to delete post');
    }
  } catch (err) {
    console.error('Error deleting post:', err);
    // Optionally show error message to user here
  }
};

export default DeletePost;
