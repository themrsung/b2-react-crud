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
        cursor: 'pointer',
        padding: '20px',
        border: '1px solid black'
      }

  const postAuthorStyle = {
    cursor: 'pointer'
  }

  return (
    <div className="Post" style={postStyle} onClick={onPostClick}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
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
    </div>
  )
}

export default Post
