import React, { Component, useState } from "react";
import {useSelector,useDispatch} from "react-redux"
import {setUserName,setUserStatus} from '../store/reducer'
import {Redirect} from "react-router-dom";

export default function Signup (props){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPWD, setConfirmPWD] = useState("");
    const [username, setUsername] = useState("");
    const [redirect, setRedirect] = useState(false);
    const dispatch = useDispatch();

    function validateForm() {
      return username.length > 0 && email.length > 0 && password.length > 0 && password === confirmPWD;
    }

    function signUp() {
      const data = {
        username : username,
        email: email,
        password: password,
      };
      fetch("/user/create", {
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
            dispatch(setUserName(data.username))
            dispatch(setUserStatus(true))
            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userName', data.username);
            setRedirect(true);
            console.log(data.username,data.token)
          }else{
            alert(data.message);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
    if (redirect) {
      return <Redirect to={'/'} />;
    }
    return (
      <div class="bg-grey-lighter max-h-screen flex flex-col">
        <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 class="mb-8 text-3xl text-center">Sign up</h1>
            <input
              type="text"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="fullname"
              placeholder="Full Name"
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="text"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="confirm_password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPWD(e.target.value)}
            />

            <button
              disabled={!validateForm()}
              type="button" onClick={signUp}
              class={validateForm()?
                "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                //style when button is disabled
                :"bg-gray-500  text-white font-bold py-2 px-4 rounded"}
            >
              Create Account
            </button>

          </div>

          <div class="text-grey-dark mt-6">
            Already have an account?
            <a
              class="no-underline border-b border-blue text-indigo-500"
              href="/sign-in/"
            > Sign in
            </a>
            .
          </div>
        </div>
      </div>
    );
  }
