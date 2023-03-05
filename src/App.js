import logo from "./logo.svg";
import "./App.css";
import Landing from "./pages/Landing Page/Landing";
import { database } from "./firebase";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

import Register from "./pages/Register Page/Register";
import Login from "./pages/Register Page/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
