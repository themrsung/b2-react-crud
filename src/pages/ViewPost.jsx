import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../components/shared/post'
import { SERVER_URL } from '../serverUrl'

const ViewPost = function () {
  const params = useParams()
  const postId = params.id

  const [post, setPost] = useState([])

  const fetchPost = async function () {
    const response = await axios.get(SERVER_URL + '/posts/' + postId)
    setPost(response.data)
  }

  let navigate = useNavigate()

  useEffect(() => {
    fetchPost()
  }, [])

  return (
    <div className="ViewPost">
      <Post post={post} noLink={true} />
    </div>
  )
}

export default ViewPost
