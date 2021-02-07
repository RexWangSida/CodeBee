import React, { Component } from "react";

export default class Signup extends Component {



  signup() {
    const data = {
      name : "Steve Jobs",
      email: "wangs132@mcmaster.ca",
      password: "108740",
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

  render() {
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
            />

            <input
              type="text"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
            />

            <input
              type="password"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
            />
            <input
              type="password"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="confirm_password"
              placeholder="Confirm Password"
            />

            <button
              type="button" onClick={this.signup}
              class="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
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
}
