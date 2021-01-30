var users = [
  {
  uid: 0,
  email : "wangs132@mcmaster.ca",
  password : "108740",
  }
];


function check(uid, email, password){
  if(users[uid].email == email && users[uid].password == password){
    return true;
  }
  return false;
}
