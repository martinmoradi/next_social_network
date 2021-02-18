import React, { useState } from "react";
import { connect } from "react-redux";
import { addPost } from "../actions/postActions";

const PostForm = ({ addPost, auth }) => {
  const [state, setState] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPost = {
      text: state,
      user: auth.user.id,
    };
    addPost(newPost);
    setState("");
  };

  return (
    <>
      <form
        onSubmit={(event) => handleSubmit(event)}
        className="bg-white border shadow-sm px-4 py-3 rounded-lg max-w-lg mx-auto mt-4"
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
            Add a new message !
          </h2>
          <div className="w-full md:w-full px-3 mb-2 mt-2">
            <textarea
              className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
              name="body"
              onChange={(event) => setState(event.target.value)}
              placeholder="Tell us something cool"
              value={state}
              required
            />
          </div>
          <div className="w-full md:w-full flex items-start md:w-full px-3">
            <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
              <svg
                fill="none"
                className="w-5 h-5 text-gray-600 mr-1"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-xs md:text-sm pt-px">Please be nice!</p>
            </div>
            <div className="-mr-1">
              <input
                type="submit"
                className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                value="Post Message"
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  auth: state.auth,
});

export default connect(mapStateToProps, { addPost })(PostForm);
