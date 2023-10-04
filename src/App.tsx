import './App.css'
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage"
import MainPage from './pages/MainPage';
import FunctionPage from './pages/FunctionPage';
import SignupPage from './pages/SignupPage';

function App() {

  return (
    <>
      <Router>
        <Route path="/main" element={<MainPage attendanceCode={''} studentNumber={0} />} />
     </Router>
      <Router>
        <Route path="/login" element={<LoginPage />} />
     </Router>
     <Router>
        <Route path="/function" element={<FunctionPage />} />
     </Router>
     <Router>
        <Route path="/signup" element={<SignupPage />} />
     </Router>
    </>
  )
}

export default App
