import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from '../layout/Layout';
import Page404 from '../pages/Page404/Page404';
import PathConstants from './PathConstants';
import Home from '../pages/Home/Home';
import Register from '../pages/Register/Register';
import AddTemplate from '../pages/AddTemplate/AddTemplate';
import TemlatesLists from '../pages/TemplatesLists/TemplatesLists';

const MainRoute = () => {
  const routes = [
    { path: PathConstants.HOME, element: <Home /> },
    { path: PathConstants.TEMPLATES, element: <TemlatesLists/> },
    { path: PathConstants.TEMPLATEADD, element: <AddTemplate/> }
  ]

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Page404 />,
      children: routes
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default MainRoute
