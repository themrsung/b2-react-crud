import axios from 'axios'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { getCurrentUserState, store } from '../../redux/config/configStore'
import { SERVER_URL } from '../../serverUrl'

const WritePostForm = function () {
  const [postTitle, setPostTitle] = useState('')
  const [postContent, setPostContent] = useState('')

  const onWritePost = () => {
    const post = {
      id: uuidv4(),
      author: getCurrentUserState().id,
      title: postTitle,
      content: postContent
    }

    axios.post(SERVER_URL + '/posts', post)
  }
  return <form className="WritePostForm"></form>
}

export default WritePostForm
