import React, { Component } from "react";
import HighlightedChar from "./HighlightedChar";

export default class Home extends Component {
    render() {
        return (
            <div>
            <div className="flex flex-col mt-20">
                <h1 className="md:text-4xl mb-16 text-5xl">
                <HighlightedChar color="blue">C</HighlightedChar>odebee{" "}
                </h1>
                </div>
                <div>
  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start" />
    <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
      Get started
    </a>
  </div>
  <div className="mt-3 sm:mt-0 sm:ml-3">
    <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
      Live demo
    </a>
</div>

          </div>
        )}
}