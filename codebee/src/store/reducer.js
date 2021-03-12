export const SET_USERNAME = "SET_USERNAME"
export const SET_USERSTATUS = "SET_USERSTATUS"

export const setUserName = (value) => ({
  type: SET_USERNAME,
  value
})

export const setUserStatus = (value) => ({
  type: SET_USERSTATUS,
  value
})

const initState = {
  username: "UnregisteredUser",
  status: false
}

export default function reducer(state = initState, action) {
  var newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case SET_USERNAME:
      newState.username = action.value
      return newState
    case SET_USERSTATUS:
      newState.status = action.value
      return newState
    default:
      return state
  }
}
