import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import Register from './pages/Register'
import UniquePost from './pages/UniquePost'
import CreatePost from './pages/CreatePost'
import SinglePost from './pages/SinglePost'
import EditPost from './pages/EditPost'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/uniquepost" element={<UniquePost />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/singlepost/:id" element={<SinglePost />} />
        <Route path="/editpost/:id" element={<EditPost />} />
      </Routes>
    </>
  )
}
