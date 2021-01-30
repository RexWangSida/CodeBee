import React from "react";
import "./Achievement.css"

var unlockedAchievements = ['01', '02', '04', '06']

export default class Achievement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allAchievements: ['01', '02', '03', '04', '05', '06', '07'],
            unlockedAchievements: ['01', '02', '04', '06'],
        }
    }

    // load() {
    //     var unlockedAchievements = fetch('data')
    //     this.setState({ unlockedAchievements: unlockedAchievements})
    // }

    isUnlocked = () => {
        const unlockedAchievements = ['01', '02', '04', '06'];
        if (this.props.achievementname in unlockedAchievements) {
            return "unlocked achievement";
        }
        else {
            return "locked achievement";
        }
    }

    select = () => {
        console.log(this.props.levelname)
        // this.setState({ selected: this.props.levelname });
    }

    render() {
        //load();
        // var classNames = [];
        // var i;
        // for (i = 0; i<this.state.allAchievements.length; i++) {
        //     classNames.push(this.state.allAchievements[i] in this.state.unlockedAchievements);
        // }

        const achievements = this.state.allAchievements.map((achievement) =>
            <li className={this.isUnlocked} achievementname={achievement} key={achievement} onClick={this.select}>{achievement}</li>);
        return (
            <ul id="canvas" className="list-disc">
                {achievements}
            </ul>
        );

    }
}
