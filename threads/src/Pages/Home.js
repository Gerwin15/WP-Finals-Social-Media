import React from 'react';
import PostList from '../components/Posts/PostList';
import CreatePost from '../components/Posts/CreatePost';
import UpdatePost from '../components/Posts/UpdatePost';

const Home = () => {
  return (
    <div>
      <CreatePost />
      <PostList />
    </div>
  );
};

export default Home;
