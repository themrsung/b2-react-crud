export const writePostTitleReducer = function (state = '', action) {
  switch (action.type) {
    case 'writePostTitle/set':
      return action.payload
    default:
      return state
  }
}
