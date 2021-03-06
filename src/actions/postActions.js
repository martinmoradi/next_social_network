import axios from "axios";
import { tokenConfig } from "../actions/authActions";
import { returnErrors } from "../actions/errorActions";

import {
  GET_POSTS,
  ADD_POST,
  EDIT_POST,
  GET_AUTHOR_INFOS,
  DELETE_POST,
  POSTS_LOADING,
} from "./types";

export const getPosts = () => async (dispatch) => {
  dispatch(setPostsLoading());
  axios
    .get("http://localhost:1337/posts?_limit=20&_sort=created_at:desc")
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
    );
};

export const getUserPosts = (userId) => async (dispatch) => {
  dispatch(setPostsLoading());
  axios.get(`http://localhost:1337/posts?user.id=${userId}`).then((res) =>
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    })
  );
};

// export const getAuthorInfos = (userId) => async (dispatch) => {
//   const config = tokenConfig(getState, "GET");
//   const response = await fetch(`http://localhost:1337/users/${userId}`, config);
//   const data = await response.json();
//   console.log(data);
//   if (data.statusCode) {
//     dispatch(
//       returnErrors(data.message[0].messages[0].message, data.statusCode)
//     );
//   } else {
//     dispatch({
//       type: GET_AUTHOR_INFOS,
//       payload: data,
//     });
//   }
// };

export const sayHello = () => console.log("hello");

export const deletePost = (id) => async (dispatch, getState) => {
  const config = tokenConfig(getState, "DELETE");
  const response = await fetch(`http://localhost:1337/posts/${id}`, config);
  const data = await response.json();
  if (data.statusCode) {
    dispatch(
      returnErrors(data.message[0].messages[0].message, data.statusCode)
    );
  } else {
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
  }
};

export const addPost = (post) => async (dispatch, getState) => {
  const config = tokenConfig(getState, "POST", post);
  const response = await fetch(`http://localhost:1337/posts`, config);
  const data = await response.json();
  if (data.statusCode) {
    dispatch(
      returnErrors(data.message[0].messages[0].message, data.statusCode)
    );
  } else {
    dispatch(getPosts());
  }
};

export const setPostsLoading = () => {
  return {
    type: POSTS_LOADING,
  };
};
