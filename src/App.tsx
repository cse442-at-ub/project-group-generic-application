import './App.css'
import { HashRouter, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from './pages/MainPage';
import FunctionPage from './pages/FunctionPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/NavBar';
import { useState } from 'react';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  return (
    <>
      <HashRouter>
        <Navbar isLoggedIn={isLoggedIn}/>
        <Route path="/main" element={<MainPage />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/function" element={<FunctionPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </HashRouter>
    </>
  )
}

export default App
