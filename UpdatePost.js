import axios from 'axios';

const UpdatePost = async (postId, updatedData, setPosts) => {
  try {
    console.log(`Sending updated data for Post ID ${postId}:`, updatedData);

    const response = await axios.put(
      `http://localhost:1337/api/posts/${postId}`,
      { data: updatedData }, // Strapi expects `data` as the payload wrapper
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`, // Include auth if required
        },
      }
    );

    if (response.status === 200) {
      console.log('Post updated successfully in database:', response.data);

      // Update the state with the modified post to reflect changes in the UI
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, Title: updatedData.title, Content: [{ children: [{ text: updatedData.content }] }] }
            : post
        )
      );

      console.log('Post state updated in the UI without refresh.');
    } else {
      console.error('Failed to update post. Response:', response.statusText);
    }
  } catch (err) {
    console.error('Error updating post:', err);
  }
};

export default UpdatePost;
