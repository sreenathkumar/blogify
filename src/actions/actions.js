export const actions = {
  auth: {
    STATUS_UPDATE: "AUTH_STATUS_UPDATE",
    LOGIN: "AUTH_LOGIN",
    LOGOUT: "AUTH_LOGOUT",
    USER_LOADED: "AUTH_USER_LOADED",
    AUTH_ERROR: "AUTH_ERROR",
    ADD_FAVOURITE: "AUTH_USER_ADD_FAVOURITE",
    REMOVE_FAVOURITE: "AUTH_USER_REMOVE_FAVOURITE",
    USER_UPDATED: "AUTH_USER_DATA_UPDATED",
    AUTH_TOKEN_UPDATE: "AUTH_TOKEN_UPDATE",
    AUTH_BLOG_CREATED: "AUTH_USER_BLOG_CREATED",
    AUTH_BLOG_ADDED: "AUTH_USER_BLOG_ADDED",
    AUTH_BLOG_UPDATED: "AUTH_BLOG_UPDATED",
    AUTH_BLOG_DELETED: "AUTH_BLOG_DELETED",
    RESET_AUTH_BLOGS: "RESET_AUTH_BLOGS",
  },
  profile: {
    DATA_LOADING: "PROFILE_DATA_LOADING",
    DATA_LOADED: "PROFILE_DATA_LOADED",
    DATA_LOAD_ERROR: "PROFILE_DATA_LOAD_ERROR",
    USER_DATA_UPDATED: "PROFILE_USER_DATA_UPDATED",
    USER_IMAGE_UPDATED: "PROFILE_USER_IMAGE_UPDATED",
    FAVOURITE_ADDED: "PROFILE_FAVOURITE_ADDED",
    FAVOURITE_REMOVED: "PROFILE_FAVOURITE_REMOVED",
  },
};
