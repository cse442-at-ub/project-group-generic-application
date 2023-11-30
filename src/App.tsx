import './App.css'
import { HashRouter, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from './pages/MainPage';
import FunctionPage from './pages/FunctionPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import ProfProfile from './pages/ProfProfile';
import Navbar from './components/NavBar';


function App() {
  return (
    <>
      <HashRouter>
        <Navbar />
        <Route path="/main" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/function" element={<FunctionPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profprofile" element={<ProfProfile />} />
      </HashRouter>
    </>
  )
}

export default App
