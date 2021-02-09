import React, { Component } from "react";
import HighlightedChar from "./HighlightedChar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Level from "./Level";
import Achievement from "./Achievement";
import Game from "./GameSystem/Game";

export default class Home extends Component {
  render() {
    return (
      <>
        <div className="flex flex-col mt-20">
          <h1 className="md:text-4xl mb-16 text-5xl">
            <HighlightedChar color="blue">C</HighlightedChar>odebee{" "}
          </h1>
        </div>
        <main className="mt-5 mx-auto max-w-7xl px-4 items-center">
          <div className="sm:text-center lg:text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-3xl">
              <span className="block xl:inline">Data to enrich your</span>
              <span className="block text-indigo-600 xl:inline">
                online business
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-center">
              <div className="rounded-md shadow">
                <a
                  href="/level-selection"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  Select Level
                </a>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <a
                  href="/achievements"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                >
                  View Achievement
                </a>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <a
                  href="/game"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                >
                  Game
                </a>
              </div>
            </div>
          </div>
          <div>
</div>

        </main>

        <Router>
          <div>
            <div className="auth-wrapper">
              <div className="auth-inner">
                <Switch>
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
