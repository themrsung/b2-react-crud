import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { currentUserReducer } from '../reducers/currentUserReducer'
// import { writePostContentReducer } from '../reducers/writePostContentReducer'
// import { writePostTitleReducer } from '../reducers/writePostTitleReducer'

export const store = configureStore({
  reducer: combineReducers([
    currentUserReducer
    // writePostTitleReducer,
    // writePostContentReducer
  ])
})

export const getCurrentUserState = function () {
  return store.getState()[0]
}

// export const getWritePostTitleState = function () {
//   return store.getState()[1]
// }

// export const getWritePostContentState = function () {
//   return store.getState()[2]
// }

export const setCurrentUserState = function (payload) {
  store.dispatch({
    type: 'currentUser/set',
    payload: payload
  })
}

// export const setWritePostTitleState = function (payload) {
//   store.dispatch({
//     type: 'writePostTitle/set',
//     payload: payload
//   })
// }

// export const setWritePostContentState = function (payload) {
//   store.dispatch({
//     type: 'writePostContent/set',
//     payload: payload
//   })
// }
