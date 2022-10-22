import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.min.css";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import PropertyDetails from "./pages/Home/PropertyDetails";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Ourteam from "./pages/Ourteam/Ourteam";
import Post from "./pages/Post/Post";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Profile from "./Components/Profile/Profile";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ourteam" element={<Ourteam />} />
        <Route path="/post" element={<Post />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </>
  );
};
export default App;
