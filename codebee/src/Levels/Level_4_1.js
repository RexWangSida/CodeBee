import React from 'react';
import * as config from './config/Level_4_1.json';

class Level_4_1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            blockList: [],
            answer: config.answer, 
            solution: [], 
            achievementList: [], 
            questionStatement: config.questionStatement,
            hints: config.hints    
        }
    }

    //TODO: Check how the solution will be stored. Might be another JSON object.
    // This method should be called by the front end when the submit button is pressed.
    achievementUpdate(){
        achievement = {}
        achievement.key = "Master Operator";
        achievement.value = "Completed the binary operators level!";
        achievements = [];
        achievements.push(achievement);
        this.setState({
            achievementList: achievements
                })
    }
}
export default Level_1_1