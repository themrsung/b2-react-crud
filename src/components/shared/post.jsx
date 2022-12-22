import { useNavigate } from 'react-router-dom'
import './sharedComponents.css'

const Post = function ({ post, noLink = false }) {
  let navigate = useNavigate()
  const onPostClick = () => {
    if (!noLink) {
      navigate('/view/' + post.id)
    }
  }

  const postStyle = noLink
    ? {}
    : {
        cursor: 'pointer'
      }

  const postAuthorStyle = {
    cursor: 'pointer'
  }

  return (
    <div className="Post" style={postStyle} onClick={onPostClick}>
      <h3>{post.title}</h3>
      <p>
        by{' '}
        <span
          style={postAuthorStyle}
          onClick={() => {
            navigate('/profile/' + post.author)
          }}
        >
          {post.author}
        </span>{' '}
        at {post.createdAt}
      </p>
      <p>{post.content}</p>
    </div>
  )
}

export default Post
