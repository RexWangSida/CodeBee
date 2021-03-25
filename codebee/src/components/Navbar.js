import React, {useState, useEffect } from "react";
import logo from "../images/codebee.jpg";
import cx from "classnames";
import { BrowserRouter as Router, Switch, Route, Link, NavLink} from "react-router-dom";
import SignIn from "./Signin";
import Home from "./Home";
import SignUp from "./Signup";
import Level from "./Level";
import Achievement from "./Achievement";
import Game from "./GameSystem/Game";
import Game2 from "./GameSystem/Game2";
import Game3 from "./GameSystem/Game3";
import {useSelector,useDispatch} from "react-redux"
import {setUserName,setUserStatus} from '../store/reducer'

export default function Navbar(props){
  const [expand, setExpand] = useState(false);
  const username = useSelector(state => state.username)
  const status = useSelector(state => state.status);
  const dispatch = useDispatch();
  //componentWillMount
  useEffect(() => {
    const name = localStorage.getItem("userName");
    const token = localStorage.getItem("userToken");
    if(name && token){
    const data = JSON.stringify({
      username: name,
      token:token
    });
    fetch("/user/auth", {
      method: "POST",
      headers: {
        "Accept": "application/json,text/plain,*/*",
        "Content-Type": "application/json",
      },
      body: data,
    }).then((res) => res.json())
      .then((data) => {
        if(data.result === 0){
            dispatch(setUserName(data.username))
            dispatch(setUserStatus(true))
        }else{
          console.log(data.message);
        }
      })
      .catch((e) => {
        console.log(e)
      });
  }}, [])

  function loginOut(){
    const data = {
      username:username,
      token:localStorage.getItem("userToken")}
    fetch("/user/logout", {
      method: "POST",
      headers: {
        "Accept": "application/json,text/plain,*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.result === 0){
            dispatch(setUserName("UnregisteredUser"))
            dispatch(setUserStatus(false))
            localStorage.removeItem("userName")
            localStorage.removeItem("userToken")
        }else if (data.result === 1){
          alert(data.message);
        }else{
          console.log(data.message);
        }
      })
      .catch((e) => {
        console.log(e)
      });

  }
  if(status){
    var varSign = (
      <button
        onClick={loginOut}
        activeclass="active"
        spy="true"
        smooth="true"
        offset={50}
        duration={600}
        delay={200}
        className="md:p-4 pl-2 py-3 px-0 block border-b-2 border-transparent transition duration-150 hover:bg-gray-100 ease-in-out width:1px text-gray-700 tracking-wider rounded-md"
      >
        Log Out
      </button>
    )
  }else{
    var varSign = (
      <>
      <NavLink
        activeclass="active"
        to="/sign-in"
        spy="true"
        smooth="true"
        offset={50}
        duration={600}
        delay={200}
        className="md:p-4 pl-2 py-3 px-0 block border-b-2 border-transparent transition duration-150 hover:bg-gray-100 ease-in-out width:1px text-gray-700 tracking-wider rounded-md"
      >
        Sign in
      </NavLink>
      <NavLink
        activeclass="active"
        to="/sign-up"
        spy="true"
        smooth="true"
        offset={50}
        duration={700}
        delay={200}
        className="md:p-4 pl-2 py-3 px-0 block border-b-2 border-transparent transition duration-150 hover:bg-gray-100 ease-in-out width:1px text-gray-700 tracking-wider rounded-md"
      >
        Sign up
      </NavLink>
      </>
    )
  }


  return (
    <Router>
      <header className="md:px-6 px-6 border-b-2 bg-white flex flex-wrap items-center py-4">
        <div className="flex-1 flex justify-between items-center">
          <NavLink to="/" className="py-3">
            <img className="h-16 w-auto" src={logo} alt="Logo" />
          </NavLink>
        </div>
        <div className="block md:hidden">
          <button
            onClick={() => setExpand(true)}
            aria-label="Expand Navigation links"
            className="transition duration-700 ease-in-out hover:bg-gray-300 rounded flex items-center px-3 py-2 text-gray-700"
          >
            <div
              className={cx({
                hidden: expand,
                block: !expand,
              })}
            >
              <i className="fas fa-bars w-4"></i>
            </div>
            <div
              className={cx({
                hidden: !expand,
                block: expand,
              })}
            >
              <i className="fas fa-times w-4"></i>
            </div>
          </button>
        </div>
        {(
          <div
            className={`${
              expand ? `block` : `hidden`
            } top-navbar border-gray-900 w-full md:inline-flex md:w-auto px-2`}
            id="menu"
          >
            <h4
              activeclass="active"
              to="About"
              spy="true"
              smooth="true"
              offset={50}
              duration={500}
              delay={200}
              className="md:p-4 pl-2 py-3 px-0 block border-b-2 border-transparent  width:1px text-gray-700 tracking-wider rounded-md"
            >
              {status ? "Hi " + username : "Hi There" }
            </h4>
            {varSign}
          </div>
        )}
        </header>
        <div className="App">
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/sign-in" component={SignIn}/>
                <Route path="/sign-up" component={SignUp} />
                <Route path="/level-selection" component={Level} />
                <Route path="/achievements" component={Achievement} />
                <Route path="/game" component={Game} />
                <Route path="/second" component={Game3} />
                <Route path="/third" component = {Game2}/>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
  );
}
