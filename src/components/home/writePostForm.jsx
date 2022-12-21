import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { getCurrentUserState, store } from '../../redux/config/configStore'
import { SERVER_URL } from '../../serverUrl'

const WritePostForm = function () {
  const [postTitle, setPostTitle] = useState('')
  const [postContent, setPostContent] = useState('')

  let navigate = useNavigate()

  const onWritePost = async () => {
    const post = {
      id: uuidv4(),
      author: getCurrentUserState().id,
      title: postTitle,
      content: postContent
    }

    await axios.post(SERVER_URL + '/posts', post)
    navigate('/')
  }
  return (
    <form
      className="WritePostForm"
      onSubmit={(e) => {
        e.preventDefault()
        onWritePost()
      }}
    >
      <div className="WritePostFormTitleContainer">
        <label>제목</label>
        <input
          type="text"
          value={postTitle}
          onChange={(e) => {
            setPostTitle(e.target.value)
          }}
          placeholder="제목을 입력하세요..."
        />
      </div>
      <div className="WritePostFormContentContainer">
        <label>내용</label>
        <textarea
          value={postContent}
          onChange={(e) => {
            setPostContent(e.target.value)
          }}
        />
      </div>
      <button type="submit">작성하기</button>
    </form>
  )
}

export default WritePostForm
