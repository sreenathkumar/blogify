import { actions } from "@actions/actions";

export const initialState = {
  user: null,
  fullName: "User Name",
  blogs: [],
  loading: false,
  error: null,
};

export const profileReducer = (state, action) => {
  switch (action.type) {
    case actions.profile.DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actions.profile.DATA_LOADED:
      return {
        ...state,
        user: action.payload,
        blogs: action.payload.blogs,
        loading: false,
      };
    case actions.profile.DATA_LOAD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actions.profile.USER_DATA_UPDATED:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    default:
      return state;
  }
};
