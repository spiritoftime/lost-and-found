import logo from "./logo.svg";
import "./App.css";
import Landing from "./pages/Landing Page/Landing";
import { database } from "./firebase";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Login from "./pages/Login Page/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
