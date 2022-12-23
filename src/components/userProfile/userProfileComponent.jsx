import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SERVER_URL } from '../../serverUrl'
import styled from 'styled-components'
import { getCurrentUserState } from '../../redux/config/configStore'

const UserProfileComponent = function ({ userId }) {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})

  const fetchUsers = async function () {
    const response = await axios.get(SERVER_URL + '/users')
    const data = response.data
    setUsers(data)
  }

  const [dummyStateBoolean, setDummyStateBoolean] = useState(false)
  const [getMatchingUsersCounter, setGetMatchingUsersCounter] = useState(0)

  let navigate = useNavigate()

  useEffect(() => {
    fetchUsers()
  }, [dummyStateBoolean])

  useEffect(() => {
    if (getMatchingUsersCounter < 25) {
      const matchingUsers = users.filter((u) => u.id === userId)
      if (matchingUsers && matchingUsers.length > 0) {
        setUser(matchingUsers[0])
      } else if (userId === '') {
        if (getCurrentUserState().id !== '') {
          setUser(users.filter((u) => u.id === getCurrentUserState().id)[0])
        } else {
          // navigate('/login/profile')
        }
      }

      const currentSession = window.sessionStorage.getItem('currentSession')
      if (
        currentSession &&
        currentSession !== '' &&
        currentSession === user.id
      ) {
        if (user.id === getCurrentUserState().id) {
          setIsOwnProfile(true)
        }
      }

      setDummyStateBoolean(!dummyStateBoolean)
      setGetMatchingUsersCounter(getMatchingUsersCounter + 1)
    } else {
      if (getCurrentUserState().id === '') {
        navigate('/login/profile')
      }
      if (!user.id) {
        navigate('/notfound')
      }
    }
  }, [users])

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

  const [isOwnProfile, setIsOwnProfile] = useState(false)

  return user ? (
    <Box>
      <ProfileBox>
        <h1>프로필 수정</h1>
        <hr />
        <div className="UserProfileComponent">
          <UserProfile className="UserProfileName">
            {!isChangingUserProfileName ? (
              <div>
                <ProfileDiv>{user.name ? user.name : 'username'}</ProfileDiv>
                <button
                  className="Button"
                  onClick={onUserProfileNameChangeClicked}
                >
                  수정
                </button>
              </div>
            ) : (
              <form
                className="UserProfileNameChangeForm"
                onSubmit={(e) => {
                  e.preventDefault()
                  onUserProfileNameChangeClicked()
                }}
              >
                <InputBox
                  type="text"
                  placeholder="Nickname"
                  required
                  onChange={(e) => {
                    setNewUserProfileName(e.target.value)
                  }}
                />
                <Button>
                  <button className="Button" type="submit">
                    수정 완료
                  </button>
                  <button
                    className="Button"
                    onClick={() => {
                      setIsChangingUserProfileName(false)
                    }}
                  >
                    취소
                  </button>
                </Button>
              </form>
            )}
          </UserProfile>
          <div className="UserProfileMotd">
            {!isChangingUserProfileMotd ? (
              <div>
                <ProfileDiv>
                  {user.motd ? user.motd : 'Message of the day'}
                </ProfileDiv>
                <button
                  className="Button"
                  onClick={onUserProfileMotdChangeClicked}
                >
                  수정
                </button>
              </div>
            ) : (
              <form
                className="UserProfileMotdChangeForm"
                onSubmit={(e) => {
                  e.preventDefault()
                  onUserProfileMotdChangeClicked()
                }}
              >
                <InputBox
                  type="text"
                  placeholder="Message of the day"
                  required
                  onChange={(e) => {
                    setNewUserProfileMotd(e.target.value)
                  }}
                />
                <br />

                <Button>
                  <button className="Button" type="submit">
                    수정 완료
                  </button>
                  <button
                    className="Button"
                    onClick={() => {
                      setIsChangingUserProfileMotd(false)
                    }}
                  >
                    취소
                  </button>
                </Button>
              </form>
            )}
          </div>
        </div>
      </ProfileBox>
    </Box>
  ) : (
    <>User not found</>
  )
}

export default UserProfileComponent

const Box = styled.div`
  display: flex;
  justify-content: center;
`

const ProfileBox = styled.div`
  min-width: 400px;
  height: 400px;
  padding: 20px;
  border: 2px solid black;
  margin: 20px;
  border-radius: 16px;
`
const Button = styled.div`
  margin-top: 13px;
`

const UserProfile = styled.div`
  height: 130px;
`

const ProfileDiv = styled.div`
  font-size: 30px;
  font-weight: 700;
`

const InputBox = styled.input`
  height: 30px;
  border: 2px solid black;
`
