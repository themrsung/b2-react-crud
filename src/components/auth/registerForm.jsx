import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { hashPassword } from '../../auth/hashPassword'
import { SERVER_URL } from '../../serverUrl'
import './authComponents.css'

const RegisterForm = function () {
  let navigate = useNavigate()
  const [userId, setUserId] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userName, setUserName] = useState('')

  const [users, setUsers] = useState([])

  const fetchUsers = async function () {
    const response = await axios.get(SERVER_URL + '/users')
    const data = response.data
    setUsers(data)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const onUserRegister = () => {
    if (userId === '' || userPassword === '') {
      alert('아이디 및 비밀번호를 확인해주세요.')
      return
    }

    if (userName === '') {
      alert('이름은 빈 칸일 수 없습니다.')
      return
    }

    const user = {
      id: userId,
      password: hashPassword(userPassword),
      name: userName,
      motd: ''
    }

    let userIdIsAlreadyTaken = false
    users.forEach((user) => {
      if (user.id === userId) {
        userIdIsAlreadyTaken = true
      }
    })

    if (!userIdIsAlreadyTaken) {
      axios.post(SERVER_URL + '/users', user)
      navigate('/login')
    } else {
      alert('이미 사용 중인 아이디입니다.')
    }
  }
  return (
    <form
      className="RegisterForm"
      onSubmit={(e) => {
        e.preventDefault()
        onUserRegister()
      }}
    >
      <div className="RegisterFormTitleContainer">
        <h3 className="RegisterFormTitle">회원가입</h3>
        <hr className="RegisterFormTitleHr"></hr>
      </div>
      <div className="RegisterFormIdContainer">
        <label>ID</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value)
          }}
        ></input>
      </div>
      <div className="RegisterFormPasswordContainer">
        <label>PASSWORD</label>
        <input
          type="password"
          value={userPassword}
          onChange={(e) => {
            setUserPassword(e.target.value)
          }}
        ></input>
      </div>
      <div className="RegisterFormNicknameContainer">
        <label>NAME</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value)
          }}
        ></input>
      </div>
      <button className="Button RegisterButton" type="submit">
        회원가입
      </button>
    </form>
  )
}

export default RegisterForm
