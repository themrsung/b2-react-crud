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

  return (
    <div className="CommentDiv">
      {!isChangingComment ? (
        <>
          <div>
            <p>{comment.content}</p>
            <p>
              by{' '}
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  navigate('/profile/' + comment.author)
                }}
              >
                {comment.author}
              </span>{' '}
              at {comment.createdAt}
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
              by {comment.author} at {comment.createdAt}
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
