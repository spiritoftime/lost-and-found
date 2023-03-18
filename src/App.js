import logo from "./logo.svg";
import "./App.css";
 

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
import MyReport from "./pages/MyReport Page/MyReport";
import Post from "./pages/post Page/Post";
import Landing from "./pages/Landing Page/Landing";
import Footer from "./components/Footer";
import Error from "./pages/Error Page/Error";
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
      <Route path="/" element={<Landing/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/report" element={<Report />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/missing" element={<Missing />} />
        <Route path="/spotted" element={<Spotted />} />
        <Route path="/myReport" element={<MyReport />} />
        <Route path="/post" element={<Post />} />
        <Route path="/*" element={<Error />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
