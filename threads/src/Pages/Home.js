import React from 'react';
import PostList from '../components/Posts/PostList';
import CreatePost from '../components/Posts/CreatePost';
import EditPost from '../components/Posts/EditPost';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Threads Mini</h1>
      <CreatePost />
      <PostList />
    </div>
  );
};

export default Home;
