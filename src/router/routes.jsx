import { createBrowserRouter } from "react-router-dom";

//Components
import CreateBlog from "@pages/CreateBlog";
import ErrorPage from "@pages/ErrorPage";
import Home from "@pages/Home";
import Login from "@pages/Login";
import Profile from "@pages/Profile";
import Register from "@pages/Register";
import SingleBlog from "@pages/SingleBlog";
import rootLoader from "@loaders/rootLoader";
import PrivateRoutes from "./PrivateRoutes";
import Root from "./Root";
import editBlogLoader from "@loaders/editBlogLoader";
import EditBlog from "@components/EditBlog";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "blog/:blogId",
            element: <SingleBlog />,
          },

          {
            element: <PrivateRoutes />,
            children: [
              {
                path: "blog/add-new",
                element: <CreateBlog />,
              },
              {
                path: "blog/:blogId/edit",
                element: <EditBlog />,
                id: "edit-blog", //id to identify the loader "editBlogLoader
                loader: editBlogLoader,
              },
            ],
          },
          {
            path: "user/:userId/profile",
            element: <Profile />,
          },
          // {
          //   path: "profile/:userId",
          //   element: <Profile />,
          // },
        ],
      },
    ],
  },
]);
