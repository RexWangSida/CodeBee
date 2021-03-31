export const SET_USERNAME = "SET_USERNAME"
export const SET_USERSTATUS = "SET_USERSTATUS"
export const ADD_USER = "ADD_USER"

export const addUser = (value)=>({
  type: ADD_USER,
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

const localUsers = JSON.parse(localStorage.getItem('users'));

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
  ].concat((localUsers ? localUsers : [])),
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
    case ADD_USER:
      var newuser = {name:action.value.username,email:action.value.email,password:action.value.password};
      newState.users.push(newuser);
      localStorage.setItem('users', JSON.stringify(newState.users.slice(7)));
      return newState
    default:
      return state
  }
}
