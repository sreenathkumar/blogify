import { actions } from "@actions/actions";

export const initialState = {
  status: "loggedOut",
  user: {},
  accessToken: null,
  refreshToken: null,
  error: null,
  loading: false,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case actions.auth.LOGIN:
      return {
        ...state,
        status: "loggedIn",
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
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
    default:
      return state;
  }
};
