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
            path: "blog/add-new",
            element: <CreateBlog />,
          },
          {
            path: "profile",
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
