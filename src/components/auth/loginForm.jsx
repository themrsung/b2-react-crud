import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { hashPassword } from '../../auth/hashPassword'

const LoginForm = function () {
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

  const onUserLogin = () => {
    const user = users.filter((user) => user.id === userId)[0]
    if (user.password === hashPassword(userPassword)) {
      navigate('/')
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
      <button type="submit">로그인</button>
    </form>
  )
}

export default LoginForm
