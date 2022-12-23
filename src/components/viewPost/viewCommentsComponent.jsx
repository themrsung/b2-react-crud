import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../../serverUrl'
import { v4 as uuidv4 } from 'uuid'
import { getCurrentUserState } from '../../redux/config/configStore'
import { useNavigate } from 'react-router-dom'
import Comment from './comment'
import './viewPostComponents.css'

const ViewCommentsComponent = ({ postId }) => {
  const [post, setPost] = useState({})

  const [comments, setComments] = useState([])

  const fetchPost = async function () {
    const response = await axios.get(SERVER_URL + '/posts/' + postId)
    setPost(response.data)
    setComments(
      response.data.comments.sort((a, b) =>
        a.createdAt < b.createdAt ? 1 : -1
      )
    )
  }

  const [dummyStateBoolean, setDummyStateBoolean] = useState(false)

  useEffect(() => {
    fetchPost()
  }, [dummyStateBoolean])

  const [userComment, setUserComment] = useState('')

  let navigate = useNavigate()

  const onWriteComment = async () => {
    const user = getCurrentUserState()
    if (user.id === '') {
      navigate('/login')
      return
    }

    const comment = {
      content: userComment,
      id: uuidv4(),
      author: getCurrentUserState().id,
      createdAt: Date.now()
    }

    let newComments = comments ? comments : []
    newComments.push(comment)

    await axios.patch(SERVER_URL + '/posts/' + postId, {
      comments: newComments
    })

    window.location.reload()
    setDummyStateBoolean(!dummyStateBoolean)
  }

  return (
    <div className="ViewCommentsDiv">
      <div className="ComentInputDiv">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onWriteComment()
          }}
        >
          <div>
            <label></label>
            <input
              value={userComment}
              onChange={(e) => {
                setUserComment(e.target.value)
              }}
            />
          </div>
          <button class="Button" type="submit">
            확인
          </button>
        </form>
      </div>
      <div>
        {comments?.map((comment) => {
          return <Comment key={comment.id} comment={comment} postId={postId} />
        })}
      </div>
    </div>
  )
}

export default ViewCommentsComponent
