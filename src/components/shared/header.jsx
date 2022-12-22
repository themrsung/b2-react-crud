import { useNavigate } from 'react-router-dom'
import { logOut } from '../../auth/logOut'
import { getCurrentUserState } from '../../redux/config/configStore'

const Header = function () {
  let navigate = useNavigate()
  return (
    <header className="Header">
      HEADER
      <div className="HeaderLeft">
        <div className="HeaderLeftTitleArea">
          <h1 className="HeaderLeftTitle">Happy2NewYear</h1>
        </div>
      </div>
      <div className="HeaderRight">
        <nav className="HeaderRightNavBar">
          <ul className="HeaderRightNavBarUl">
            <li>
              <button
                onClick={() => {
                  navigate('/')
                }}
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigate('/write')
                }}
              >
                Write
              </button>
            </li>
          </ul>
        </nav>
        <div className="HeaderRightProfileMenu">
          <ul className="HeaderRightProfileMenuUl">
            <li>
              <button
                onClick={() => {
                  navigate('/profile')
                }}
              >
                Profile
              </button>
            </li>

            {getCurrentUserState() !== '' ? (
              <>
                <button
                  onClick={() => {
                    navigate('/login')
                  }}
                >
                  Login
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    logOut()
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </ul>
        </div>
      </div>
      <div>
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
      </div>
    </header>
  )
}

export default Header
