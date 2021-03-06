import React, { Component, useState } from "react";
import {useSelector,useDispatch} from "react-redux"
import {setUserName,setUserStatus} from '../store/reducer'
import {Redirect} from "react-router-dom";

export default function SignUp (props){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPWD, setConfirmPWD] = useState("");
    const [name, setName] = useState("");
    const [redirect, setRedirect] = useState(false);
    const dispatch = useDispatch();

    function validateForm() {
      return name.length > 0 && email.length > 0 && password.length > 0 && password === confirmPWD;
    }

    function signup() {
      const data = {
        name : name,
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
            dispatch(setUserName(data.name))
            dispatch(setUserStatus(true))
            localStorage.setItem('userData', JSON.stringify(data.name));
            setRedirect(true);
            console.log("registered")
          }else if(data.result === 1){
            alert("The email is already signed up");//////////////////////replace for duplicate email
          }
        })
        .catch(() => {
          console.log("bad request!");
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
              onChange={(e) => setName(e.target.value)}
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
              type="button" onClick={signup}
              class={validateForm()?
                "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                //style when button is disabled
                :"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
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
