import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../../serverUrl'

const ViewCommentsComponent = ({ postId }) => {
  const [post, setPost] = useState({})

  const [comments, setComments] = useState([])

  const fetchPost = async function () {
    const response = await axios.get(SERVER_URL + '/posts/' + postId)
    setPost(response.data)
    setComments(response.data.comments)
  }

  useEffect(() => {
    fetchPost()
  }, [])

  const [userComment, setUserComment] = useState('')

  const onWriteComment = () => {
    console.log('test')
  }

  return (
    <div className="ViewCommentsComponent">
      <div>
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
          <button type="submit">확인</button>
        </form>
      </div>
      <div>
        {comments.map((comment) => {
          return <div key={comment.id}></div>
        })}
      </div>
    </div>
  )
}

export default ViewCommentsComponent
