import { useLocation, useNavigate } from 'react-router-dom'
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

  const location = useLocation()

  const [searchKeyword, setSearchKeyword] = useState('')
  const onSearch = () => {
    navigate('/search/' + searchKeyword)
  }

  return (
    <header className="Header">
      <div className="HeaderLeft">
        <div
          className="HeaderLeftTitleArea"
          onClick={() => {
            if (location.pathname !== '/') {
              navigate('/')
            } else {
              window.location.reload()
            }
          }}
        >
          <img className="HeaderLeftLogo" src={logo} alt="H2NY-logo" />
          <h1 className="HeaderLeftTitle">Happy2NewYear</h1>
        </div>
      </div>
      <div className="HeaderMiddle">
        <div className="HeaderMiddleSearchArea">
          <form
            className="HeaderMiddleSearchForm"
            onSubmit={(e) => {
              e.preventDefault()
              onSearch()
            }}
          >
            <input
              className="HeaderMiddleSearchInput"
              placeholder="키워드를 입력해주세요!"
              value={searchKeyword}
              onChange={(e) => {
                setSearchKeyword(e.target.value)
              }}
            />
            <button type="submit">검색</button>
          </form>
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
                id="OpenWriteModalButton"
                className="Button BigButton MenuButton"
                // onClick={() => {
                //   navigate('/write')
                // }}
                onClick={() => {
                  if (isLoggedIn) {
                    openModal()
                  } else {
                    navigate('/login/write')
                  }
                }}
              >
                Write
              </button>
              <ModalForm
                open={modalOpen}
                close={closeModal}
                header="HAPPY NEW YEAR"
              ></ModalForm>
            </li>
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
        </nav>
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
