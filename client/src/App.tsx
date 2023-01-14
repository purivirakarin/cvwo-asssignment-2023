import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu'
import Settings from './pages/Settings';
import Navbar from './pages/Navbar';
import { Box } from "@mui/material";
import { useSelector } from "react-redux";


function App() {
  // const { user } = useSelector((state:any) => {
  //   return {
  //     user: state.currentUser,
  //   };
  // });

  return (
    <Box>
      {/* <Navbar user={user}/> */}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Box>
  );
}

export default App
