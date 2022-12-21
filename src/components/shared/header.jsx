import { useNavigate } from 'react-router-dom'

const Header = function () {
  let navigate = useNavigate()
  return (
    <header className="header">
      HEADER
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
    </header>
  )
}

export default Header
