import {
  GET_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  GET_AUTHOR_INFOS,
  POSTS_LOADING,
} from "../actions/types";

const initialState = {
  posts: [],
  loading: false,
  authorInfos: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case POSTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_AUTHOR_INFOS:
      return {
        ...state,
        authorInfos: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
