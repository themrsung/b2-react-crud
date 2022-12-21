import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { hashPassword } from '../../auth/hashPassword'

const RegisterForm = function () {
  let navigate = useNavigate()
  const [userId, setUserId] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const [users, setUsers] = useState([])

  const fetchUsers = async function () {
    const response = await axios.get('http://localhost:3001/users')
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

    const user = {
      id: userId,
      password: hashPassword(userPassword)
    }

    let userIdIsAlreadyTaken = false
    users.forEach((user) => {
      if (user.id === userId) {
        userIdIsAlreadyTaken = true
      }
    })

    if (!userIdIsAlreadyTaken) {
      axios.post('http://localhost:3001/users', user)
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
      <label>ID</label>
      <input
        type="text"
        value={userId}
        onChange={(e) => {
          setUserId(e.target.value)
        }}
      ></input>
      <label>PASSWORD</label>
      <input
        type="password"
        value={userPassword}
        onChange={(e) => {
          setUserPassword(e.target.value)
        }}
      ></input>
      <button type="submit">회원가입</button>
    </form>
  )
}

export default RegisterForm
