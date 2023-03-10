import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NewsfeedComponent from '../components/home/newsfeedComponent'
import './style/Home.css'
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
      <div className="HomeBanner">
        <img
          className="HomeBannerActual"
          src="/shcj-banner.png"
          alt="Happy New Years Banner"
        ></img>
      </div>
      <div
        style={{
          width: '80%',
          margin: 'auto'
        }}
      >
        <NewsfeedComponent posts={posts} />
      </div>
    </div>
  )
}

export default Home
