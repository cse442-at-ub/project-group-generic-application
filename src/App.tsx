import './App.css'
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage"
import MainPage from './pages/MainPage';

function App() {

  return (
    <>
      <Router>
        <Route path="/main" element={<MainPage />} />
     </Router>
      <Router>
        <Route path="/login" element={<LoginPage />} />
     </Router>
    </>
  )
}

export default App
