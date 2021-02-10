import React from "react";
import "./Achievement.css"

var lockedAchievement = 'Locked Achievement';

export default class Achievement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allAchievements: ['Completed 1st Level', lockedAchievement, lockedAchievement, lockedAchievement, lockedAchievement, lockedAchievement, lockedAchievement],
            unlockedAchievements: ['Completed 1st Level'],
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
                achievements.push(<li className="achievement py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-indigo-600" achievementname={achievement} key={achievement} onClick={this.select}>{achievement}</li>);
            }
            else {
                achievements.push(<li className="locked achievement py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-indigo-600" achievementname={achievement} key={achievement} >{achievement}</li>);
            }
        }

        return (
            <ul id="canvas" className="list-disc">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-3xl" style={{ marginBottom: "30px" }}>
                    <span className="block text-indigo-600 xl:inline" >
                        Achievements
              </span>
                </h1>
                {achievements}
            </ul>
        );

    }
}
