import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUserState } from '../../redux/config/configStore'
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

  let navigate = useNavigate()

  if (!user) {
    navigate('/login')
  }

  const currentlyLoggedInUserId = getCurrentUserState().id
  const isProfileOfCurrentUser = user
    ? user.id === currentlyLoggedInUserId
    : false

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
      <div className="UserProfileComponent">
        <div className="UserProfileId">
          <h3>{user.id}</h3>
        </div>
        <div className="UserProfileName">
          {!isChangingUserProfileName ? (
            <div>
              <h3>{user.name ? user.name : 'username'}</h3>
              {isProfileOfCurrentUser ? (
                <button onClick={onUserProfileNameChangeClicked}>수정</button>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <form
              className="UserProfileNameChangeForm"
              onSubmit={(e) => {
                e.preventDefault()
                onUserProfileNameChangeClicked()
              }}
            >
              <input
                type="text"
                placeholder="Name"
                required
                onChange={(e) => {
                  setNewUserProfileName(e.target.value)
                }}
              />
              <button type="submit">수정 완료</button>
            </form>
          )}
        </div>
        <div className="UserProfileMotd">
          {!isChangingUserProfileMotd ? (
            <div>
              <h3>{user.motd ? user.motd : 'motd'}</h3>
              {isProfileOfCurrentUser ? (
                <button onClick={onUserProfileMotdChangeClicked}>수정</button>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <form
              className="UserProfileMotdChangeForm"
              onSubmit={(e) => {
                e.preventDefault()
                onUserProfileMotdChangeClicked()
              }}
            >
              <input
                type="text"
                placeholder=""
                value={newUserProfileMotd}
                onChange={(e) => {
                  setNewUserProfileMotd(e.target.value)
                }}
              />
              <button type="submit">수정 완료</button>
            </form>
          )}
        </div>
      </div>
    </ProfileBox>
  ) : (
    <>User not found</>
  )
}

export default UserProfileComponent

const ProfileBox = styled.div`
  width: 420px;
  height: 300px;
  padding: 20px;
  border: 1px solid;
  border-radius: 20px;
`
