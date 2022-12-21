import { useNavigate } from 'react-router-dom'
import { logOut } from '../../../auth/logOut'

const Header = function () {
  let navigate = useNavigate()
  return (
    <header className="header">
      HEADER
      <button
        onClick={() => {
          navigate('/')
        }}
      >
        (개발용) 홈으로
      </button>
      <button
        onClick={() => {
          navigate('/login')
        }}
      >
        (개발용) 로그인으로
      </button>
      <button
        onClick={() => {
          navigate('/register')
        }}
      >
        (개발용) 회원가입으로
      </button>
      <button
        onClick={() => {
          navigate('/profile')
        }}
      >
        (개발용) 내 프로필
      </button>
      <button
        onClick={() => {
          navigate('/profile/admin')
        }}
      >
        (개발용) admin의 프로필
      </button>
      <button
        onClick={() => {
          logOut()
        }}
      >
        (개발용) 로그아웃
      </button>
      <button
        onClick={() => {
          navigate('/write')
        }}
      >
        (개발용) 글쓰기
      </button>
    </header>
  )
}

export default Header
