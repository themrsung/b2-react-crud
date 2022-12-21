import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { currentUserReducer } from '../reducers/currentUserReducer'

export const store = configureStore({
  reducer: combineReducers([currentUserReducer])
})

export const getCurrentUserState = function () {
  return store.getState()[0]
}

export const setCurrentUserState = function (payload) {
  store.dispatch({
    type: 'currentUser/set',
    payload: payload
  })
}
