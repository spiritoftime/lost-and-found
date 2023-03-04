import logo from "./logo.svg";
import "./App.css";
import Landing from "./pages/Landing Page/Landing";
import { database } from "./firebase";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

import Register from "./pages/Register Page/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
