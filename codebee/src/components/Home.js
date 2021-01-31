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
            </div>
        )}
}