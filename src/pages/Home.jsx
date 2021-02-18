import React from "react";
import PostsList from "../components/PostsList";
import PostForm from "../components/PostForm";
const Home = () => {
  return (
    <div className="text-center mt-6">
      Home Page!
      <div>
        <PostForm />
      </div>
      <div>
        <PostsList />
      </div>
    </div>
  );
};

export default Home;
