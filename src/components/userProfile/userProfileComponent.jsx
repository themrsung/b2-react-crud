import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SERVER_URL } from '../../serverUrl'
import styled from 'styled-components'

const UserProfileComponent = function ({ userId }) {
  const [users, setUsers] = useState([])

  const fetchUsers = async function () {
    const response = await axios.get(SERVER_URL + '/users')
    const data = response.data
    setUsers(data)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const user = users.filter((user) => user.id === userId)[0]

  const navigate = useNavigate()

  if (!user) {
    navigate('/login/profile')
  }

  const [isChangingUserProfileName, setIsChangingUserProfileName] =
    useState(false)
  const [isChangingUserProfileMotd, setIsChangingUserProfileMotd] =
    useState(false)

  const [newUserProfileName, setNewUserProfileName] = useState('')
  const [newUserProfileMotd, setNewUserProfileMotd] = useState('')

  const onUserProfileNameChangeClicked = async function () {
    if (isChangingUserProfileName) {
      await axios.patch(SERVER_URL + '/users/' + user.id, {
        name: newUserProfileName
      })
      await fetchUsers()
    }
    setIsChangingUserProfileName(!isChangingUserProfileName)
  }

  const onUserProfileMotdChangeClicked = async function () {
    if (isChangingUserProfileMotd) {
      await axios.patch(SERVER_URL + '/users/' + user.id, {
        motd: newUserProfileMotd
      })
      await fetchUsers()
    }
    setIsChangingUserProfileMotd(!isChangingUserProfileMotd)
  }

  return user ? (
    <ProfileBox>
      <h2>프로필 수정</h2>
      <hr />
      <div className="UserProfileComponent">
        <div className="UserProfileName">
          {!isChangingUserProfileName ? (
            <div>
              <h3>{user.name ? user.name : 'username'}</h3>
              <button onClick={onUserProfileNameChangeClicked}>수정</button>
            </div>
          ) : (
            <form
              className="UserProfileNameChangeForm"
              onSubmit={(e) => {
                e.preventDefault()
                onUserProfileNameChangeClicked()
              }}
            >
              <h3>{user.name ? user.name : 'username'}</h3>
              <input
                type="text"
                placeholder="Nickname"
                required
                onChange={(e) => {
                  setNewUserProfileName(e.target.value)
                }}
              />
              <Button>
                <button type="submit">수정 완료</button>
                <button>취소</button>
              </Button>
            </form>
          )}
        </div>

        <div className="UserProfileMotd">
          {!isChangingUserProfileMotd ? (
            <div>
              <h3>{user.motd ? user.motd : 'Message of the day'}</h3>
              <button onClick={onUserProfileMotdChangeClicked}>수정</button>
            </div>
          ) : (
            <form
              className="UserProfileMotdChangeForm"
              onSubmit={(e) => {
                e.preventDefault()
                onUserProfileMotdChangeClicked()
              }}
            >
              <h3>{user.motd ? user.motd : 'Message of the day'}</h3>
              <input
                type="text"
                placeholder="Message of the day"
                required
                onChange={(e) => {
                  setNewUserProfileMotd(e.target.value)
                }}
              />
              <Button>
                <button type="submit">수정 완료</button>
                <button>취소</button>
              </Button>
            </form>
          )}
        </div>
        <hr />
      </div>
    </ProfileBox>
  ) : (
    <>User not found</>
  )
}

export default UserProfileComponent

const ProfileBox = styled.div`
  margin: 35px;
  width: 420px;
  height: 300px;
  padding: 20px;
`

const Button = styled.div`
  margin: 5px;
`
