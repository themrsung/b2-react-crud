import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUserState } from '../../redux/config/configStore'
import { SERVER_URL } from '../../serverUrl'
import './sharedComponents.css'

const Post = function ({ post, noLink = false, noModifyButtons = false }) {
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

  const [isOwnPost, setIsOwnPost] = useState(false)

  useEffect(() => {
    const userId = window.sessionStorage.getItem('currentSession')
    if (userId && userId !== '') {
      if (post.author === userId) {
        setIsOwnPost(true)
      }
    }
  }, [])

  const [isChangingPost, setIsChangingPost] = useState(false)
  const [newPostContent, setNewPostContent] = useState(post.content)
  const [newPostTitle, setNewPostTitle] = useState(post.title)

  const onPostEdit = async () => {
    if (isChangingPost) {
      const newPost = {
        id: post.id,
        author: post.author,
        content: newPostContent,
        title: newPostTitle,
        createdAt: post.createdAt,
        comments: post.comments
      }

      await axios.put(SERVER_URL + '/posts/' + post.id, newPost)

      window.location.reload()
    }

    setIsChangingPost(!isChangingPost)
  }

  const onPostDelete = async () => {
    await axios.delete(SERVER_URL + '/posts/' + post.id)
    navigate('/')
  }

  return (
    <div className="Post" style={postStyle} onClick={onPostClick}>
      {!isChangingPost ? (
        <>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </>
      ) : (
        <>
          <input
            value={newPostTitle}
            onChange={(e) => {
              setNewPostTitle(e.target.value)
            }}
          ></input>
          <textarea
            value={newPostContent}
            onChange={(e) => {
              setNewPostContent(e.target.value)
            }}
          ></textarea>
        </>
      )}
      <p>
        작성자 :{' '}
        <span
          style={postAuthorStyle}
          onClick={() => {
            navigate('/profile/' + post.author)
          }}
        >
          {post.author}
        </span>{' '}
        / at {post.createdAt}
      </p>

      {!noModifyButtons && isOwnPost ? (
        <div>
          {!isChangingPost ? (
            <>
              {' '}
              <button className="Button" onClick={onPostEdit}>
                수정
              </button>
              <button className="Button" onClick={onPostDelete}>
                삭제
              </button>
            </>
          ) : (
            <>
              <button className="Button" onClick={onPostEdit}>
                수정완료
              </button>
              <button
                className="Button"
                onClick={() => {
                  setIsChangingPost(false)
                }}
              >
                수정취소
              </button>
            </>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Post
