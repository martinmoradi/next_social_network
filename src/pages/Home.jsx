import React from "react";
import PostsList from "../components/PostsList";
import PostForm from "../components/PostForm";
import { connect } from "react-redux";

const Home = ({ auth }) => {
  const { isAuthenticated } = auth;

  return (
    <div className="text-center mt-12">
      <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl dark:text-white">
        Welcome on
        <span className="block text-indigo-600 dark:text-indigo-500 xl:inline">
          My Social Network
        </span>
      </h1>
      <h2 className="my-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl dark:text-white">
        This website is a training to Redux and React. We use auth and routing
        to create a small social media website.
      </h2>
      <div>
        {isAuthenticated ? (
          <PostForm />
        ) : (
          <h2 className="mt-6 italic text-gray-600">
            Please register or login to post a message
          </h2>
        )}
      </div>
      <div>
        <PostsList />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Home);
