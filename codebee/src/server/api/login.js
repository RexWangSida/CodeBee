var users = [
  {
  uid: 0,
  email : "wangs132@mcmaster.ca",
  password : "108740",
  }
];


function check(email, password){
  if(users[0].email == email && users[0].password == password){
    return true;
  }
  return false;
}
