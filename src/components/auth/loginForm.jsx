import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { hashPassword } from '../../auth/hashPassword'
import { setCurrentUserState } from '../../redux/config/configStore'
import { SERVER_URL } from '../../serverUrl'
import './authComponents.css'

const LoginForm = function () {
  let navigate = useNavigate()
  const [userId, setUserId] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const [users, setUsers] = useState([])

  // const cookies = new Cookies()

  const fetchUsers = async function () {
    const response = await axios.get(SERVER_URL + '/users')
    const data = response.data
    setUsers(data)
  }
  let params = useParams()
  const goBackTo = params.id ? params.id : ''

  const [autoLogin, setAutoLogin] = useState(true)

  useEffect(() => {
    // if (cookies.get('auto-login') === 'true') {
    //   setCurrentUserState({
    //     id: cookies.get('auto-login-id')
    //   })
    //   navigate('/' + goBackTo)
    //   return
    // }
    fetchUsers()
  }, [])

  const onUserLogin = () => {
    const user = users.filter((user) => user.id === userId)[0]
    if (user.password === hashPassword(userPassword)) {
      setCurrentUserState({
        id: user.id
      })
      // if (autoLogin) {
      //   cookies.set('auto-login', 'true', { path: '/' })
      //   cookies.set('auto-login-id', user.id, { path: '/' })
      // }

      // if (autoLogin) {
      //   const secret = new TextEncoder().encode('autologintest')
      //   const alg = 'HS256'
      //   const jwt = new jose.SignJWT({ 'urn:example:claim': true })
      //     .setProtectedHeader({ alg })
      //     .setIssuedAt()
      //     .setIssuer('urn:example:issuer')
      //     .setAudience('urn:example:audience')
      //     .setExpirationTime('1w')
      //     .sign(secret)
      // }

      window.sessionStorage.setItem('currentSession', user.id)

      navigate('/' + goBackTo)
      return
    }

    alert('아이디 및 비밀번호를 확인해주세요')
  }

  return (
    <form
      className="LoginForm"
      onSubmit={(e) => {
        e.preventDefault()
        onUserLogin()
      }}
    >
      <div className="LoginFormTitleContainer">
        <h3 className="LoginFormTitle">로그인</h3>
        <hr className="LoginFormTitleHr"></hr>
      </div>
      <div className="LoginFormIdContainer">
        <label>ID</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value)
          }}
        ></input>
      </div>
      <div className="LoginFormPasswordContainer">
        <label>PASSWORD</label>
        <input
          type="password"
          value={userPassword}
          onChange={(e) => {
            setUserPassword(e.target.value)
          }}
        ></input>
      </div>

      <button className="Button LoginButton" type="submit">
        로그인
      </button>
      <div className="RegisterButtonArea">
        <h3 className="RegisterText">회원이 아니신가요?</h3>
        <hr className="RegisterTextHr"></hr>
        <button
          className="Button RegisterButton"
          onClick={() => {
            navigate('/register')
          }}
        >
          회원가입
        </button>
      </div>
    </form>
  )
}

export default LoginForm
