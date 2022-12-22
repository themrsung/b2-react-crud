import axios from 'axios'
import { useEffect, useState } from 'react'
import NewsfeedComponent from '../components/home/newsfeedComponent'
import { getCurrentUserState } from '../redux/config/configStore'
import { SERVER_URL } from '../serverUrl'

const Home = function () {
  //개발용
  const [users, setUsers] = useState([])

  const fetchUsers = async function () {
    const response = await axios.get('http://localhost:3001/users')
    setUsers(response.data)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  //배포용
  const [posts, setPosts] = useState([])

  const fetchPosts = async function () {
    const response = await axios.get(SERVER_URL + '/posts')
    setPosts(response.data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="Home">
      <NewsfeedComponent posts={posts} />

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
