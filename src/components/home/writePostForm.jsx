import axios from 'axios'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { SERVER_URL } from '../../serverUrl'

const WritePostForm = function () {
  const [postTitle, setPostTitle] = useState('')
  const [postContent, setPostContent] = useState('')

  const onWritePost = () => {
    const post = {
      id: uuidv4(),
      title: postTitle,
      content: postContent
    }

    axios.post(SERVER_URL + '/posts', post)
  }
  return <form className="WritePostForm"></form>
}

export default WritePostForm
