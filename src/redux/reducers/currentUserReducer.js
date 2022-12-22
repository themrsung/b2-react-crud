export const currentUserReducer = function (
  state = {
    id: ''
  },
  action
) {
  switch (action.type) {
    case 'currentUser/set':
      return action.payload
    default:
      return state
  }
}
