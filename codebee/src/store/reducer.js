export const SET_USERNAME = "SET_USERNAME"
export const SET_USERSTATUS = "SET_USERSTATUS"
export const SIGN_UP = "SIGN_UP"

export const signup = (value)=>({
  type: SIGN_UP,
  value
})

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
  status: false,
  users:[
    {name:"Kris Yang",email:"yangw19@mcmaster.ca",password:"123456"},
    {name:"Sida Wang",email:"wangs132@mcmaster.ca",password:"123456"},
    {name:"Jason Nagy",email:"nagyj2@mcmaster.ca",password:"123456"},
    {name:"Deuce Cao",email:"caoh8@mcmaster.ca",password:"123456"},
    {name:"Shivaansh Prasann",email:"prasanns@mcmaster.ca",password:"123456"},
    {name:"Josh Wu",email:"wuy176@mcmaster.ca",password:"123456"},
    {name:"Tester",email:"usertest@gmail.com",password:"123456"},
  ]
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
