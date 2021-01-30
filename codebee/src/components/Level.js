import React from "react";
import "./Level.css"

var unlockedLevels = ['1-1', '1-2', '2-1', '2-2']

export default class Level extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allLevels: ['1-1', '1-2', '1-3', '2-1', '2-2'],
            unlockedLevels: ['1-1', '1-2', '2-1', '2-2'],
            selected: ""
        }
    }

    // load() {
    //     var unlockedLevels = fetch('data')
    //     this.setState({ unlockedLevels: unlockedLevels})
    // }

    isUnlocked = () => {
        const unlockedLevels = ['1-1', '1-2', '2-1', '2-2'];
        return this.props.levelname in unlockedLevels;
    }

    select = () => {
        console.log(this.props.levelname)
        // this.setState({ selected: this.props.levelname });
    }

    render() {
        // load();

        const buttons = this.state.allLevels.map((button) =>
            <button id="levelButton" className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-blue-500 hover:bg-blue-700" onClick={this.select} disabled={!this.isUnlocked} key={button} levelname={button}> {button} </button>);
        return (
            <div id="levelGrid" className="grid grid-rows-3 grid-flow-col gap-4" >
                {buttons}
            </div>
        );
    }
}
