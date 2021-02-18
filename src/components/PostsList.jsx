import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPosts, deletePost } from "../actions/postActions";

const PostsList = ({ posts, getPosts, deletePost, auth }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const onDeleteClick = (id) => {
    deletePost(id);
  };

  const { isAuthenticated, user } = auth;
  
  const renderList = () => {
    return posts.posts.map((post) => {
      return (
        <div
          className="bg-white border shadow-sm px-4 py-3 rounded-lg max-w-lg mx-auto mt-4"
          key={post.id}
        >
          <div className="flex items-center">
            {isAuthenticated && user.id === post.user.id ? (
              <button
                className="px-2 text-xs py-1 bg-red-400 rounded-xl text-white shadow-md"
                onClick={onDeleteClick.bind(this, post.id)}
              >
                Delete
              </button>
            ) : (
              ""
            )}
            <div className="ml-2">
              <div className="text-sm ">
                <span className="font-semibold">{post.id}</span>
              </div>
              <div className="text-gray-500 text-xs flex">
                <span className="inline-block">3d </span>
              </div>
            </div>
          </div>
          <p className="text-gray-800 text-sm mt-2 leading-normal md:leading-relaxed">
            {post.text}
          </p>

          <div className="text-gray-500 text-xs flex items-center mt-3">
            <img
              className="mr-0.5"
              src="https://static-exp1.licdn.com/sc/h/7fx9nkd7mx8avdpqm5hqcbi97"
            />
            <span className="ml-1">
              {post.like === null ? "0" : post.like}{" "}
              {post.like > 1 ? "likes" : "like"}
            </span>
            <div className="justify-self-end"></div>
          </div>
        </div>
      );
    });
  };

  return <div>{renderList()}</div>;
};

const mapsStateToProps = (state) => ({
  posts: state.posts,
  auth: state.auth,
});

export default connect(mapsStateToProps, { getPosts, deletePost })(PostsList);
