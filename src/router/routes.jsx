import { createBrowserRouter } from "react-router-dom";

//Components
import Root from "./Root";
import Home from "@pages/Home";
import Register from "@pages/Register";
import CreateBlog from "@pages/CreateBlog";
import Login from "@pages/Login";
import SingleBlog from "@pages/SingleBlog";
import Profile from "@pages/Profile";
import ErrorPage from "@pages/ErrorPage";
import PrivateRoutes from "./PrivateRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
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
                path: "user/:userId/profile",
                element: <Profile />,
              },
            ],
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
