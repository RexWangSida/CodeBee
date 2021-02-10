import React from "react";
import "./Level.css"
import Game from "./GameSystem/Game"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

var unlockedLevels = ["1-1", "1-2", "2-1", "2-2"]

export default class Level extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allLevels: ["1-1", "1-2", "1-3", "2-1", "2-2"],
            unlockedLevels: ["1-1"],
            selected: ""
        }
    }

    // load() {
    //     var unlockedLevels = fetch("data")
    //     this.setState({ unlockedLevels: unlockedLevels})
    // }

    select = (event) => {
        console.log(event.target.value)
        this.setState({ selected: event.target.value });
    }

    render() {
        // load();
        var buttons = []
        var i;
        for (i = 0; i < this.state.allLevels.length; i++) {
            var levelname = this.state.allLevels[i];
            if (this.state.unlockedLevels.includes(levelname)) {
                buttons.push(
                    <Link to="/game" key={levelname}>
                        <button
                            id="levelButton"
                            className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo"
                            onClick={this.select}
                            value={levelname}>
                            {levelname}
                        </button>
                    </Link>
                );
            }
            else {
                buttons.push(<button id="levelButton" className="disabled py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-indigo-600" disabled key={levelname}> {levelname} </button>);
            }
        }

        return (
            <>
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-3xl" style={{ margin: "30px" }}>
                    <span className="block text-indigo-600 xl:inline" >
                        Level
              </span>
                    <span className="block xl:inline"> Selection </span>
                </h1>
                <div id="levelGrid" className="grid grid-rows-3 grid-flow-col gap-4" >
                    {buttons}
                </div>

                <Router>
                    <div className="App">
                        <div className="auth-wrapper">
                            <div className="auth-inner">
                                <Switch>
                                    <Route exact path="/game" component={Game} />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </Router>
            </>
        );
    }
}
