import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { SERVER_URL } from '../../serverUrl'
import './homeComponents.css'

const WritePostForm = function () {
  const [postTitle, setPostTitle] = useState('')
  const [postContent, setPostContent] = useState('')

  let navigate = useNavigate()

  const userId = window.sessionStorage.getItem('currentSession')

  if (userId && userId !== '') {
    navigate('/login')
  }

  const onWritePost = async () => {
    const currentUserId = window.sessionStorage.getItem('currentSession')
    const post = {
      id: uuidv4(),
      author: currentUserId,
      title: document.getElementById('WritePostTitleInput').value,
      content: document.getElementById('WritePostContentInput').value,
      createdAt: Date.now(),
      comments: []
    }

    await axios.post(SERVER_URL + '/posts', post)
    navigate('/view/' + post.id)
    document.getElementById('CloseWritePostModalButton').click()
    window.location.reload()
  }
  const getErrorMsg = () => {
    return alert('제목과 내용을 입력해주세요.')
  }

  return (
    <form
      className="WritePostForm"
      onSubmit={(e) => {
        e.preventDefault()

        // setPostTitle(document.getElementById('WritePostTitleInput').value)
        // setPostContent(document.getElementById('WritePostContentInput').value)
        if (
          document.getElementById('WritePostTitleInput').value === '' ||
          document.getElementById('WritePostContentInput').value === ''
        ) {
          return getErrorMsg()
        }
        onWritePost()
      }}
    >
      <div className="WritePostFormTitleContainer">
        <input
          id="WritePostTitleInput"
          className="WritePostFormTitle"
          type="text"
          // value={postTitle}
          // onChange={(e) => {
          //   setPostTitle(e.target.value)
          // }}
          // onChange={(e) => {}}
          placeholder="제목을 입력하세요."
        />
      </div>
      <div className="WritePostFormContentContainer">
        <textarea
          id="WritePostContentInput"
          placeholder="내용을 입력하세요."
          // value={postContent}
          // onChange={(e) => {
          //   setPostContent(e.target.value)
          // }}
          // onChange={(e) => {}}
        />
      </div>
      <button type="submit" className="customButton">
        작성하기
      </button>
    </form>
  )
}

export default WritePostForm

// const StForm = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 24px;
//   padding: 20px;
//   align-items: center;
//   justify-content: center;
//   /* border-radius: 20px; */
// `

// const StInput = styled.input`
//   border: 1px solid #2e2727;
//   margin: 0 24px;
//   height: 25px;
//   width: 300px;
//   border-radius: 12px;
//   outline: none;
//   padding: 0 10px;
//   text-align: center;
// `

// // 텍스트가 들어가는 창은 텍스트에디터를 써도 될듯
// const StText = styled.textarea`
//   width: 400px;
//   min-height: 300px;
//   border-radius: 12px;
//   outline: none;
//   border: 1px solid #2e2727;
//   text-align: center;
//   padding: 10px;
// `

// const StButton = styled.button`
//   border: none;
//   background-color: #2e2727;
//   color: white;
//   height: 35px;
//   cursor: pointer;
//   width: 80px;
//   border-radius: 20px;
//   /* margin: 5px; */
// `
