import axios from "axios";

import {
  GET_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  POSTS_LOADING,
} from "./types";

export const getPosts = () => (dispatch) => {
  dispatch(setPostsLoading());
  axios.get("http://localhost:1337/posts").then((res) =>
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    })
  );
};

export const deletePost = (id) => (dispatch) => {
  axios.delete(`http://localhost:1337/posts/${id}`).then((res) => {
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
  });
};

export const addPost = (post) => (dispatch) => {
  axios.post("http://localhost:1337/posts", post).then((res) =>
    dispatch({
      type: ADD_POST,
      payload: res.data,
    })
  );
};

export const setPostsLoading = () => {
  return {
    type: POSTS_LOADING,
  };
};
