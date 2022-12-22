import { useNavigate } from 'react-router-dom'
import { logOut } from '../../auth/logOut'
import { getCurrentUserState } from '../../redux/config/configStore'
import './sharedComponents.css'

const Header = function () {
  let navigate = useNavigate()
  return (
    <header className="Header">
      <div className="HeaderLeft">
        <div className="HeaderLeftTitleArea">
          <h1
            className="HeaderLeftTitle"
            onClick={() => {
              navigate('/')
            }}
          >
            Happy2NewYear
          </h1>
        </div>
      </div>
      <div className="HeaderRight">
        <nav className="HeaderRightNavBar">
          <ul className="HeaderRightNavBarUl">
            <li>
              <button
                className="Button BigButton MenuButton"
                onClick={() => {
                  navigate('/')
                }}
              >
                Home
              </button>
            </li>
            <li>
              <button
                className="Button BigButton MenuButton"
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
                className="Button BigButton MenuButton"
                onClick={() => {
                  navigate('/profile')
                }}
              >
                Profile
              </button>
            </li>
            <li>
              {getCurrentUserState() !== '' ? (
                <>
                  <button
                    className="Button BigButton MenuButton"
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
                    className="Button BigButton MenuButton"
                    onClick={() => {
                      logOut()
                    }}
                  >
                    Logout
                  </button>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
      {/* <div>
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
      </div> */}
    </header>
  )
}

export default Header
