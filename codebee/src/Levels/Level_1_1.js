import React from 'react';
//import Blocks
import * as config from './config/Level_1_1.json';

class Level_1_1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            blockList: [], 
            answer: config.answer, 
            solution: [], 
            achievementList: [], 
            questionStatement: config.questionStatement,
            hints: ["list of strings"]    
        }
    }

    importBlocks() {
        importedBlocks = [];
        var i;
        for (i in config.blockList){
            importedBlocks.push();//TODO resolve
        }
        this.setState({
            blockList: importedBlocks
                })
    }
    importBlocks();

    //TODO: Check how the solution will be stored. Might be another JSON object.

    // This method should be called by the front end when the submit button is pressed.
    achievementUpdate(){
        //If answer is correct and solution has not been viewied, add achievement.
        achievement = {}
        achievement.key = "NewBee";
        achievement.value = "Completed the first level!";
        achievements = [];
        achievements.push(achievement);
        this.setState({
            achievementList: achievements
                })
    }
}
export default Level_1_1