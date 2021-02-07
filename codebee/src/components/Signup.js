import React, { Component, useState } from "react";

export default function Signup (){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const [name, setName] = useState("");

    function validateForm() {
      return email.length > 0 && password.length > 0;
    }

  function signup() {
    const data = {
      name : name,
      email: email,
      password: password,
    };

    fetch("/createuser", {
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
          alert("You have been signed into the system");//////////////////////////////////////////////////////////////replace for good signup
        }else if(data.result === 1){
          alert("The email is already signed up");//////////////////////replace for duplicate email
        }
      })
      .catch(() => {
        console.log("bad request!");
      });
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
            />

            <button
              type="button" onClick={signup}
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
