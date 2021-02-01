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

    render() {
        //load();
        var achievements = [];
        var i;
        for (i = 0; i < this.state.allAchievements.length; i++) {
            var achievement = this.state.allAchievements[i];
            if (this.state.unlockedAchievements.includes(achievement)) {
                achievements.push(<li className="achievement" achievementname={achievement} key={achievement} onClick={this.select}>{achievement}</li>);
            }
            else {
                achievements.push(<li className="locked achievement" achievementname={achievement} key={achievement} >{achievement}</li>);
            }
        }

        return (
            <ul id="canvas" className="list-disc">
                {achievements}
            </ul>
        );

    }
}
