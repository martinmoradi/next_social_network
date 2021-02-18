import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getUserPosts, deletePost } from "../actions/postActions";
import moment from "moment";

const Profile = ({ posts, auth, getUserPosts, deletePost }) => {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const { isAuthenticated, user } = auth;

  useEffect(() => {
    getUserPosts(user.id);
  }, [getUserPosts]);

  const onDeleteClick = (id) => {
    deletePost(id);
  };

  useEffect(() => {
    setUserName(auth.user.username);
    if (auth.user.description) {
      setUserDescription(auth.user.description);
    }
  }, [setUserName, setUserDescription]);

  const handleSubmit = () => {};

  const handleCancel = () => {
    setUserName(auth.user.username);
    setUserDescription(auth.user.description);
  };

  const renderList = () => {
    return posts.posts.map((post) => {
      return (
        <div
          className="bg-white relative border shadow-sm px-4 py-3 rounded-lg max-w-lg mx-auto mt-4"
          key={post.id}
        >
          <div className="flex items-center">
            {isAuthenticated && user.id === post.user.id ? (
              <button
                className="px-2 text-xs py-1 bg-red-400 rounded-xl text-white shadow-md absolute top-2 right-2"
                onClick={onDeleteClick.bind(this, post.id)}
              >
                Delete
              </button>
            ) : (
              ""
            )}
            <div className="ml-2">
              <div className="text-sm ">
                <span className="font-semibold text-lg -ml-10">
                  {post.user.username[0].toUpperCase() +
                    post.user.username.substring(1)}
                </span>
              </div>
              <div className="text-gray-500 text-xs flex">
                <span className="inline-block">
                  {moment(post.created_at).startOf().fromNow()}
                </span>
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

  return (
    <>
      <form className="space-y-8 divide-y divide-gray-200 mt-8">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <div>
              <h3 className="text-2xl font-bold leading-6 text-gray-900">
                Profile
              </h3>
            </div>

            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  for="username"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Username
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    <input
                      type="text"
                      name="username"
                      onChange={(event) => setUserName(event.target.value)}
                      id="username"
                      value={userName}
                      autocomplete="username"
                      className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  for="about"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Description
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <textarea
                    id="about"
                    name="about"
                    onChange={(event) => setUserDescription(event.target.value)}
                    value={userDescription}
                    rows="3"
                    className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                  ></textarea>
                  <p className="mt-2 text-sm text-gray-500">
                    Write a few sentences about yourself.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
      {renderList()}
    </>
  );
};
const mapStateToProps = (state) => ({
  posts: state.posts,
  auth: state.auth,
});

export default connect(mapStateToProps, { getUserPosts, deletePost })(Profile);
