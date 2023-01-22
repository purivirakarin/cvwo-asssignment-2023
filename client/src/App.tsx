import React from "react";
import Register from "./components/register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import CreateBlog from "./components/CreateBlog";
import Navbar from "./components/Navbar";
import BlogDetail from "./components/BlogDetails";
import PersonalBlog from "./components/PersonalBlog";
import EditPost from "./components/EditPost";

export interface IApplicationProps {}

const App: React.FunctionComponent<IApplicationProps> = () => {
  return (
    <div className="flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/detail/:id" element={<BlogDetail />} />
          <Route path="/personal" element={<PersonalBlog />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
    </div>
  );
}

export default App;
