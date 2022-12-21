import axios from 'axios'
import { useEffect, useState } from 'react'
import { getCurrentUserState } from '../redux/config/configStore'

const Home = function () {
  const [users, setUsers] = useState()

  const fetchUsers = async function () {
    const response = await axios.get('http://localhost:3001/users')
    setUsers(response.data)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="Home">
      HOME
      <button
        onClick={() => {
          console.log(users)
        }}
      >
        (개발용) 유저DB 콘솔로그 찍기
      </button>
      <button
        onClick={() => {
          console.log(getCurrentUserState())
        }}
      >
        (개발용) currentUserState 콘솔에 찍기
      </button>
    </div>
  )
}

export default Home
