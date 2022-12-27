export const writePostContentReducer = function (state = '', action) {
  switch (action.type) {
    case 'writePostContent/set':
      return action.payload
    default:
      return state
  }
}
