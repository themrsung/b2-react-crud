import { useNavigate } from 'react-router-dom'
import { logOut } from '../../auth/logOut'
import { useState } from 'react'

import { getCurrentUserState, store } from '../../redux/config/configStore'
import './sharedComponents.css'

import ModalForm from '../home/modalForm'
import logo from '../../logo.svg'

const Header = function () {
  let navigate = useNavigate()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  store.subscribe(() => {
    setIsLoggedIn(getCurrentUserState().id !== '')
  })

  // 모달관련
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <header className="Header">
      <div className="HeaderLeft">
        <div
          className="HeaderLeftTitleArea"
          onClick={() => {
            navigate('/')
          }}
        >
          <img className="HeaderLeftLogo" src={logo} alt="H2NY-logo" />
          <h1 className="HeaderLeftTitle">Happy2NewYear</h1>
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
                // onClick={() => {
                //   navigate('/write')
                // }}
                onClick={openModal}
              >
                Write
              </button>
              <ModalForm
                open={modalOpen}
                close={closeModal}
                header="HAPPY NEW YEAR"
              ></ModalForm>
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
              {!isLoggedIn ? (
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
                      navigate('/')
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
