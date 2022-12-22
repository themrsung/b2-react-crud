import { useNavigate } from 'react-router-dom'
import './sharedComponents.css'

const Post = function ({ post, noLink = false }) {
  let navigate = useNavigate()
  const onPostClick = () => {
    if (!noLink) {
      navigate('/view/' + post.id)
    }
  }
  return (
    <div className="Post" onClick={onPostClick}>
      <h3>{post.title}</h3>
      <p>
        by {post.author} at {post.createdAt}
      </p>
      <p>{post.content}</p>
    </div>
  )
}

export default Post
