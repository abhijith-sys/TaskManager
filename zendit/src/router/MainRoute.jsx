import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from '../layout/Layout';
import Page404 from '../pages/Page404/Page404';
import PathConstants from './PathConstants';
import Home from '../pages/Home/Home';
import { Counter } from '../features/counter/Counter';
import Register from '../pages/Register/Register';
import Templates from '../pages/Templates/Templates';

const MainRoute = () => {
  const routes = [
    { path: PathConstants.HOME, element: <Home /> },
    { path: PathConstants.TEAM, element: <Counter /> },
    { path: PathConstants.TEMPLATES, element: <Templates/> },
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
