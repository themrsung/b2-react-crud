import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { getCurrentUserState } from '../../redux/config/configStore'
import { SERVER_URL } from '../../serverUrl'
import styled from 'styled-components'

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
    const post = {
      id: uuidv4(),
      author: getCurrentUserState().id,
      title: postTitle,
      content: postContent,
      createdAt: Date.now(),
      comments: []
    }

    await axios.post(SERVER_URL + '/posts', post)
    navigate('/')
  }
  return (
    <StForm
      className="WritePostForm"
      onSubmit={(e) => {
        e.preventDefault()
        onWritePost()
      }}
    >
      <div className="WritePostFormTitleContainer">
        {/* <label>제목</label> */}
        <StInput
          type="text"
          value={postTitle}
          onChange={(e) => {
            setPostTitle(e.target.value)
          }}
          placeholder="제목을 입력하세요..."
        />
      </div>
      <div className="WritePostFormContentContainer">
        {/* <label>내용</label> */}
        <StText
          value={postContent}
          onChange={(e) => {
            setPostContent(e.target.value)
          }}
        />
      </div>
      <StButton type="submit">작성하기</StButton>
    </StForm>
  )
}

export default WritePostForm

const StForm = styled.form`
  /* background-color: #ffc7c7; */
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  /* margin-bottom: 24px; */
`

const StInput = styled.input`
  border: 1px solid #dfd3c3;
  margin: 0 24px;
  height: 25px;
  width: 300px;
  border-radius: 12px;
  outline: none;
  padding: 0 10px;
  text-align: center;
`

// 텍스트가 들어가는 창은 텍스트에디터를 써도 될듯
const StText = styled.textarea`
  width: 400px;

  min-height: 300px;
  border-radius: 12px;
  outline: none;
  border: 1px solid #dfd3c3;
  /* padding: 0 10px; */
  text-align: center;
`

const StButton = styled.button`
  border: none;
  background-color: #eb455f;
  color: white;
  height: 35px;
  cursor: pointer;
  width: 80px;
  border-radius: 20px;
  margin: 5px;
`
