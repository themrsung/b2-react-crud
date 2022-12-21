import { setCurrentUserState } from '../redux/config/configStore'

export const logOut = () => {
  setCurrentUserState({
    id: ''
  })
}
