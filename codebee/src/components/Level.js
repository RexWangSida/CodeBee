import React from "react";
import "./Level.css"

var unlockedLeLevels = ['1-1', '1-2', '2-1', '2-2']

export default class Level extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allLevels: ['1-1', '1-2', '1-3', '2-1', '2-2'],
            unlockedLeLevels: ['1-1', '1-2', '2-1', '2-2'],
            selected: ""
        }
    }

    // load() {
    //     var unlockedLeLevels = fetch('data')
    //     this.setState({ unlockedLeLevels: unlockedLeLevels})
    // }

    isUnlocked() {
        return this.props.levelname in this.state.unlockedLeLevels;
    }

    select() {
        this.setState({ selected: this.props.levelname });
    }

    render() {
        // load();
        var buttons = [];
        var i;
        for (i = 0; i < this.state.allLevels.length; i++) {
            buttons.push(<button id="levelButton" className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-blue-500 hover:bg-blue-700" onClick={this.select.bind(this)} disabled={!this.isUnlocked.bind(this)} key={this.state.allLevels[i]} levelname={this.state.allLevels[i]}>
                {this.state.allLevels[i]}
            </button>);
        }
        return (
            <div id="levelGrid" className="grid grid-rows-3 grid-flow-col gap-4">
                {buttons}
            </div>
        );
    }
}
