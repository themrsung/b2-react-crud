import './App.css'
import Header from './components/shared/header'
import Footer from './components/shared/footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import UserProfile from './pages/UserProfile'
import WritePost from './pages/WritePost'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile/:id" element={<UserProfile />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="write" element={<WritePost />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
