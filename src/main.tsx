import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import ReactDOM from 'react-dom/client'

import LoginPage from "./pages/LoginPage"
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import MainPage from './pages/MainPage.tsx';
import HomePage from './pages/HomePage.tsx';
import FunctionPage from './pages/FunctionPage.tsx';
import SignupPage from './pages/SignupPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';

const router = createHashRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/main",
    element: <MainPage />,
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/function",
    element: <FunctionPage/>
  },
  {
    path: "/signup",
    element: <SignupPage/>
  },
  {
    path: "/profile",
    element: <ProfilePage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)


