import React from "react";
import PostsList from "../components/PostsList";
import PostForm from "../components/PostForm";
import { connect } from "react-redux";

const Home = ({ auth }) => {
  const { isAuthenticated } = auth;

  return (
    <div className="text-center mt-6">
      <h1>Welcome on My Social Network.</h1>
      <h2>
        This website is a training to Redux and React. We use auth and routing
        to create a small social media website.
      </h2>
      <div>
        {isAuthenticated ? (
          <PostForm />
        ) : (
          <h2>Please register or login to post a message</h2>
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
