import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { hashPassword } from '../../auth/hashPassword'
import { setCurrentUserState } from '../../redux/config/configStore'
import { SERVER_URL } from '../../serverUrl'

const LoginForm = function () {
  let navigate = useNavigate()
  const [userId, setUserId] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const [users, setUsers] = useState([])

  const fetchUsers = async function () {
    const response = await axios.get(SERVER_URL + '/users')
    const data = response.data
    setUsers(data)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  let params = useParams()
  const goBackTo = params.id ? params.id : ''

  const onUserLogin = () => {
    const user = users.filter((user) => user.id === userId)[0]
    if (user.password === hashPassword(userPassword)) {
      setCurrentUserState({
        id: user.id
      })
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

      <button type="submit">로그인</button>
    </form>
  )
}

export default LoginForm
