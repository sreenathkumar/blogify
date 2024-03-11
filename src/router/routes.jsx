import { createBrowserRouter } from "react-router-dom";

//Components
import CreateBlog from "@pages/CreateBlog";
import ErrorPage from "@pages/ErrorPage";
import Home from "@pages/Home";
import Login from "@pages/Login";
import Profile from "@pages/Profile";
import Register from "@pages/Register";
import SingleBlog from "@pages/SingleBlog";
import loginCheck from "@utils/loginCheck";
import PrivateRoutes from "./PrivateRoutes";
import Root from "./Root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: loginCheck,
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
                element: <CreateBlog />,
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
