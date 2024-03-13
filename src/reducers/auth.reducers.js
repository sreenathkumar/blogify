import { actions } from "@actions/actions";

export const initialState = {
  status: "loggedOut",
  user: {},
  blogs: [],
  accessToken: null,
  refreshToken: null,
  error: null,
  loading: false,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case actions.auth.STATUS_UPDATE:
      return {
        ...state,
        status: "login",
        ...action.payload,
      };
    case actions.auth.LOGIN:
      return {
        ...state,
        status: "loggedIn",
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        blogs: [],
        error: null,
        loading: false,
      };
    case actions.auth.LOGOUT:
      return {
        ...initialState,
      };
    case actions.auth.ADD_FAVOURITE:
      return {
        ...state,
        user: {
          ...state.user,
          favourites: [...state.user.favourites, action.payload],
        },
      };
    case actions.auth.REMOVE_FAVOURITE:
      return {
        ...state,
        user: {
          ...state.user,
          favourites: state.user.favourites.filter(
            (fav) => fav.id !== action.payload
          ),
        },
      };
    case actions.auth.USER_UPDATED:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case actions.auth.AUTH_TOKEN_UPDATE:
      return {
        ...state,
        status: "loggedIn",
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case actions.auth.AUTH_BLOG_CREATED:
      return {
        ...state,
        user: {
          ...state.user,
          blogs: [...state.user.blogs, action.payload],
        },
      };
    case actions.auth.AUTH_BLOG_UPDATED:
      return {
        ...state,
        blogs: state.blogs.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog
        ),
      };
    case actions.auth.AUTH_BLOG_DELETED:
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog.id !== action.payload),
      };
    case actions.auth.RESET_AUTH_BLOGS:
      return {
        ...state,
        blogs: [],
      };
    default:
      return state;
  }
};
