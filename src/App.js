import logo from "./logo.svg";
import "./App.css";

import Landing from "./pages/Report Page/Report";

import { database } from "./firebase";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

import Register from "./pages/Register Page/Register";
import Login from "./pages/Register Page/Login";
import Report from "./pages/Report Page/Report";
import Profile from "./pages/profile_page/Profile";
import Feed from "./pages/Feed Page/Feed";
import NavBar from "./components/NavBar";
import Missing from "./pages/Report Page/Missing";
import Spotted from "./pages/Report Page/Spotted";
function App() {
  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/report" element={<Report />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feed" element={<Feed/>}/>
        <Route path="/missing" element={<Missing/>}/>
        <Route path="/spotted" element={<Spotted/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
