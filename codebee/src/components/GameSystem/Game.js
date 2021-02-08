import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { BLOCKS, ATTRS } from './Data';
import { shuffle, move, GAME_STATE } from './utils';
import Dropzone from './Dropzone';
import { Link } from 'react-router-dom';
import './Game.css';

const GAME_DURATION = 1000 * 30; // 30 seconds

const initialState = {
  // we initialize the state by populating the bench with a shuffled collection of blocks
  bench: shuffle(BLOCKS),
  [ATTRS.PLAY]: [],
  gameState: GAME_STATE.READY,
  timeLeft: 0,
};

class Instruction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instruction: "A variable can be thought of as a container with a name, that stores some data. \nThis data can be viewed, changed and use for other purposes.For example, a variable called num stores a value 5 as: \nnum = 5\nYour challenge here is to store the values 2 and 3 in two variables called a and b. \nThen store the result of adding the value in these two variables in a new variable called c."
    }
  }

  render() {
    return (
      <div className="left instruction">{this.state.instruction}</div>
    );
  }
}

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "The result of game will be shown here."
    }
  }

  render() {
    return (
      <div className="left result">{this.state.result}</div>
    );
  }
}

class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <div className="right buttonGroup">
        <Link to="/level-selection">
          <button className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-blue-500">Return</button>
        </Link>
        <button className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-blue-500" >Restart</button>
        <button className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-blue-500">Save</button>
      </div>
    );
  }
}

class Game extends React.Component {
  state = initialState;

  onDragEnd = ({ source, destination }) => {
    if (!destination) {
      return;
    }

    this.setState(state => {
      return move(state, source, destination);
    });
  };

  render() {
    const { gameState, timeLeft, bench, ...groups } = this.state;
    const isDropDisabled = gameState === GAME_STATE.DONE;

    return (
      <div className='canves'>
        <div className='row'><Instruction /><Buttons /></div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="row container row-auto" style={{ height: "calc(100% - 400px)" }}>
            <Dropzone
              pos="left"
              id={ATTRS.PLAY}
              blocks={this.state[ATTRS.PLAY]}
              isDropDisabled={isDropDisabled}
            />
            <Dropzone
              pos="right"
              id="bench"
              blocks={bench}
              isDropDisabled={isDropDisabled} />
          </div>
        </DragDropContext>
        <div className='row' style={{ bottom: "0px" }}>
          <Result />
          <div className='right' style={{ margin: "auto" }}>
            <button className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-blue-500" >Submit</button>
          </div></div>
      </div>
    );
  }
}

export default Game;