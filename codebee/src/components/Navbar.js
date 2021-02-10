import React, { Component, useState, useEffect } from "react";
import logo from "../images/codebee.jpg";
import cx from "classnames";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Signin from "./Signin";
import Home from "./Home";
import SignUp from "./Signup";
import Level from "./Level";
import Achievement from "./Achievement";
import Game from "./GameSystem/Game";

export default class Navbar extends Component{

  //const [isExpanded, toggleExpansion] = useState(false);
constructor(props){
    super(props);
    this.state = {
        username: '',
        status: false,
        expand: false,
    }
}

onLoginChange = (username, status) => {
    this.setState({ 
      username: username,
      status: status
    });
    console.log(this.state.status)
    console.log(this.state.username)
  }


  render(){
  return (
    <>
      <header className="md:px-6 px-6 border-b-2 bg-white flex flex-wrap items-center py-4">
        <div className="flex-1 flex justify-between items-center">
          <a href="/" className="py-3">
            <img className="h-16 w-auto" src={logo} alt="Logo" />
          </a>
        </div>
        <div className="block md:hidden">
          <button
            onClick={() => this.setState({expand: true})}
            aria-label="Expand Navigation links"
            className="transition duration-700 ease-in-out hover:bg-gray-300 rounded flex items-center px-3 py-2 text-gray-700"
          >
            <div
              className={cx({
                hidden: this.state.expand,
                block: !this.state.expand,
              })}
            >
              <i className="fas fa-bars w-4"></i>
            </div>
            <div
              className={cx({
                hidden: !this.state.expand,
                block: this.state.expand,
              })}
            >
              <i className="fas fa-times w-4"></i>
            </div>
          </button>
        </div>
        {(
          <div
            className={`${
              this.state.expand ? `block` : `hidden`
            } top-navbar border-gray-900 w-full md:inline-flex md:w-auto px-2`}
            id="menu"
          >
            <h4
              activeClass="active"
              to="About"
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
              delay={200}
              className="md:p-4 pl-2 py-3 px-0 block border-b-2 border-transparent  width:1px text-gray-700 tracking-wider rounded-md"
            >
              {this.state.status ? "Hi " + this.state.username : "Hi There" }
            </h4>
            <a
              activeClass="active"
              to="Events"
              spy={true}
              smooth={true}
              offset={50}
              duration={600}
              delay={200}
              className="md:p-4 pl-2 py-3 px-0 block border-b-2 border-transparent transition duration-150 hover:bg-gray-100 ease-in-out width:1px text-gray-700 tracking-wider rounded-md"
              href="/sign-in"
            >
              Sign in
            </a>
            <a
              activeClass="active"
              to="Media"
              spy={true}
              smooth={true}
              offset={50}
              duration={700}
              delay={200}
              className="md:p-4 pl-2 py-3 px-0 block border-b-2 border-transparent transition duration-150 hover:bg-gray-100 ease-in-out width:1px text-gray-700 tracking-wider rounded-md"
              href="/sign-up"
            >
              Sign up
            </a>
          </div>
        )}
      </header>
      <Router>
        <div className="App">
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/sign-in" render={(props)=><Signin {...props} onLoginChange = {this.onLoginChange.bind(this)}/> }/>
                <Route path="/sign-up" component={SignUp} />
                <Route path="/level-selection" component={Level} />
                <Route path="/achievements" component={Achievement} />
                <Route path="/game" component={Game} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
        }
}
