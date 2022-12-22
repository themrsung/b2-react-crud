import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NewsfeedComponent from '../components/home/newsfeedComponent'
import { getCurrentUserState } from '../redux/config/configStore'
import { SERVER_URL } from '../serverUrl'

const Home = function ({ goTo }) {
  let navigate = useNavigate()
  let params = useParams()

  useEffect(() => {
    if (goTo === 'write') {
      document.getElementById('OpenWriteModalButton').click()
    }
  }, [])

  useEffect(() => {
    if (params.id) {
      navigate('/notfound')
    }
  }, [])

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
    </div>
  )
}

export default Home
