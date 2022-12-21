import { useParams } from 'react-router-dom'
import UserProfileComponent from '../components/userProfile/userProfileComponent'
import { getCurrentUserState } from '../redux/config/configStore'

const UserProfile = function () {
  let params = useParams()
  const userId = params.id ? params.id : getCurrentUserState().id
  return <UserProfileComponent userId={userId} />
}

export default UserProfile
