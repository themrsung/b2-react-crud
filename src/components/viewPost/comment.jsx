import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SERVER_URL } from '../../serverUrl'
import './viewPostComponents.css'

const Comment = ({ comment, postId }) => {
  let navigate = useNavigate()

  const [isChangingComment, setIsChangingComment] = useState(false)
  const [newCommentContent, setNewCommentContent] = useState(comment.content)
  const [post, setPost] = useState({})

  const [dummyStateBoolean, setDummyStateBoolean] = useState(false)

  const [isOwnComment, setIsOwnComment] = useState(false)

  useEffect(() => {
    const userId = window.sessionStorage.getItem('currentSession')
    if (userId && userId !== '') {
      if (comment.author === userId) {
        setIsOwnComment(true)
      }
    }
  }, [])

  const onCommentEdit = async () => {
    if (isChangingComment) {
      let newComments = post.comments.filter((c) => c.id !== comment.id)

      const newComment = {
        id: comment.id,
        content: newCommentContent,
        author: comment.author,
        createdAt: Date.now()
      }
      newComments.push(newComment)

      await axios.patch(SERVER_URL + '/posts/' + postId, {
        comments: newComments
      })

      window.location.reload()

      setDummyStateBoolean(!dummyStateBoolean)
    }
    setIsChangingComment(!isChangingComment)
  }

  const fetchPost = async function () {
    const response = await axios.get(SERVER_URL + '/posts/' + postId)
    setPost(response.data)
  }

  useEffect(() => {
    fetchPost()
  }, [dummyStateBoolean])

  const onCommentDelete = async () => {
    const newComments = post.comments.filter((c) => c.id !== comment.id)

    await axios.patch(SERVER_URL + '/posts/' + postId, {
      comments: newComments
    })
    window.location.reload()

    setIsChangingComment(!isChangingComment)
  }

  // 좋아요만들기
  const [like, setLike] = useState(0)
  const clickLike = (e) => {
    setLike(like + 1)
  }

  const [users, setUsers] = useState([])

  const fetchUsers = async function () {
    const response = await axios.get(SERVER_URL + '/users')
    const data = response.data
    setUsers(data)

    // setTimeout(() => {
    //   const user = users.filter((u) => u.id === comment.author)

    //   console.log(users)
    // }, 5000)

    if (post.author) {
      const matchingUsers = users.filter((u) => u.id === post.author)
      if (matchingUsers.length > 0) {
        const userName = matchingUsers[0].name
        setAuthorName(userName)
      }
    }
  }

  const [authorName, setAuthorName] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  //타임스탬프 변환(댓글)
  const date_comment = new Date(comment.createdAt)

  const year_comment = date_comment.getFullYear().toString().slice(-2)
  const month_comment = ('0' + (date_comment.getMonth() + 1)).slice(-2)
  const day_comment = ('0' + date_comment.getDate()).slice(-2)
  const hour_comment = ('0' + date_comment.getHours()).slice(-2)
  const minute_comment = ('0' + date_comment.getMinutes()).slice(-2)
  const second_comment = ('0' + date_comment.getSeconds()).slice(-2)

  const returnDateComment =
    year_comment +
    '.' +
    month_comment +
    '.' +
    day_comment +
    '. ' +
    hour_comment +
    ':' +
    minute_comment +
    ':' +
    second_comment

  return (
    <div className="CommentDiv">
      {!isChangingComment ? (
        <>
          <div>
            <p className="CommentContent">{comment.content}</p>
            <p className="CommentMetaData">
              by{' '}
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  navigate('/profile/' + comment.author)
                }}
              >
                {authorName}
              </span>{' '}
              / {returnDateComment}
              <h6>
                <div>
                  <span onClick={clickLike} className="HeartShape">
                    ♡
                  </span>
                  {like}
                </div>
              </h6>
            </p>
          </div>
          <div>
            {isOwnComment && (
              <>
                <button className="Button" onClick={onCommentEdit}>
                  수정
                </button>
                <button className="Button" onClick={onCommentDelete}>
                  삭제
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div>
            <input
              value={newCommentContent}
              onChange={(e) => {
                setNewCommentContent(e.target.value)
              }}
            />
            <p>
              by {authorName}at{comment.createdAt}
            </p>
          </div>
          <div>
            <button className="Button" onClick={onCommentEdit}>
              수정 완료
            </button>
            <button
              className="Button"
              onClick={() => {
                setIsChangingComment(false)
              }}
            >
              취소
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Comment
