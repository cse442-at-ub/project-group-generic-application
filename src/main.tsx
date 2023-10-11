import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import LoginPage from "./pages/LoginPage"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import MainPage from './pages/MainPage.tsx';
import HomePage from './pages/HomePage.tsx';
import FunctionPage from './pages/FunctionPage.tsx';
import SignupPage from './pages/SignupPage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/main",
    element: <MainPage attendanceCode={'temp'} studentNumber={0}/>,
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
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)


