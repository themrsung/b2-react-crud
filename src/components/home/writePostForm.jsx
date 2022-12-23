import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { getCurrentUserState } from '../../redux/config/configStore'
import { SERVER_URL } from '../../serverUrl'
import './homeComponents.css'

const WritePostForm = function () {
  const [postTitle, setPostTitle] = useState('')
  const [postContent, setPostContent] = useState('')

  let navigate = useNavigate()

  const [users, setUsers] = useState([])

  const fetchUsers = async function () {
    const response = await axios.get(SERVER_URL + '/users')
    const data = response.data
    setUsers(data)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const user = users.filter((user) => user.id === getCurrentUserState().id)[0]

  if (!user) {
    navigate('/login')
  }

  const onWritePost = async () => {
    const currentUserId = window.sessionStorage.getItem('currentSession')
    const post = {
      id: uuidv4(),
      author: currentUserId,
      title: postTitle,
      content: postContent,
      createdAt: Date.now(),
      comments: []
    }

    await axios.post(SERVER_URL + '/posts', post)
    navigate('/view/' + post.id)
    document.getElementById('CloseWritePostModalButton').click()
  }
  const getErrorMsg = (params) => {
    return alert('제목과 내용을 입력해주세요.')
  }

  return (
    <form
      className="WritePostForm"
      onSubmit={(e) => {
        e.preventDefault()
        if (!postTitle || !postContent) {
          return getErrorMsg()
        }
        onWritePost()
      }}
    >
      <div className="WritePostFormTitleContainer">
        <input
          className="WritePostFormTitle"
          type="text"
          value={postTitle}
          onChange={(e) => {
            setPostTitle(e.target.value)
          }}
          placeholder="제목을 입력하세요."
        />
      </div>
      <div className="WritePostFormContentContainer">
        <textarea
          placeholder="내용을 입력하세요."
          value={postContent}
          onChange={(e) => {
            setPostContent(e.target.value)
          }}
        />
      </div>
      <button type="submit" className="Button">
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
