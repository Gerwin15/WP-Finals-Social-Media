import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import PostPage from './Pages/PostPage';
import CreatePost from './components/Posts/CreatePost';
import EditPost from './components/Posts/EditPost';
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/editpost/:id" element={<EditPost />} />
        
      </Routes>
    </Router>
  );
};

export default App;
