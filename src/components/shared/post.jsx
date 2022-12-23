import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SERVER_URL } from '../../serverUrl'
import './sharedComponents.css'

const Post = function ({ post, noLink = false, noModifyButtons = false }) {
  let navigate = useNavigate()
  const onPostClick = () => {
    if (!noLink) {
      navigate('/view/' + post.id)
    }
  }

  const [users, setUsers] = useState([])

  const fetchUsers = async function () {
    const response = await axios.get(SERVER_URL + '/users')
    const data = response.data
    setUsers(data)
  }

  const [dummyStateBoolean, setDummyStateBoolean] = useState(false)
  const [fetchUserNameCounter, setFetchUserNameCounter] = useState(0)
  const [userName, setUserName] = useState('')
  useEffect(() => {
    if (fetchUserNameCounter < 25) {
      const matchingUsers = users.filter((user) => user.id === post.author)
      if (matchingUsers && matchingUsers.length > 0) {
        const newUserName = matchingUsers[0].name ?? ''
        setUserName(newUserName)
        setDummyStateBoolean(!dummyStateBoolean)
      }
      setFetchUserNameCounter(fetchUserNameCounter + 1)
    }
  }, [users])

  useEffect(() => {
    fetchUsers()
  }, [dummyStateBoolean])

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
          <h3>{post.title}</h3>
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
        by{' '}
        <span
          style={postAuthorStyle}
          onClick={() => {
            navigate('/profile/' + post.author)
          }}
        >
          {userName}
        </span>{' '}
        at {post.createdAt}
      </p>

      {!noModifyButtons ? (
        <div>
          {!isChangingPost ? (
            <>
              {' '}
              <button onClick={onPostEdit}>수정</button>
              <button onClick={onPostDelete}>삭제</button>
            </>
          ) : (
            <>
              <button onClick={onPostEdit}>수정완료</button>
              <button
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
