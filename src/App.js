import './App.css'
import Header from './components/shared/header'
import Footer from './components/shared/footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import UserProfile from './pages/UserProfile'
import ViewPost from './pages/ViewPost'
import NotFound from './pages/NotFound'
import { useEffect } from 'react'
import { setCurrentUserState } from './redux/config/configStore'

function App() {
  useEffect(() => {
    const sessionId = window.sessionStorage.getItem('currentSession')
    if (sessionId && sessionId !== '') {
      // assume logged in
      setCurrentUserState({
        id: sessionId
      })
    }
  }, [])
  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Home />} />
            <Route path="/notfound" element={<NotFound />} />
            <Route path="login" element={<Login />} />
            <Route path="login/:id" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile/:id" element={<UserProfile />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="write" element={<Home goTo="write" />} />
            <Route path="view/:id" element={<ViewPost />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
