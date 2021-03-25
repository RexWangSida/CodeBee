import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { BLOCKS, ATTRS } from './Data3';
import { shuffle, move, GAME_STATE, getTotalScore } from './utils';
import Dropzone from './Dropzone';
import { Link } from 'react-router-dom';
import './Game.css';

const GAME_DURATION = 1000 * 30; // 30 seconds

const initialState = {
  // we initialize the state by populating the bench with a shuffled collection of blocks
  bench: shuffle(BLOCKS),
  showHint: false,
  hint:`You are trying to create the series 1 3 5 7 9
  You can start with the number 1, and then repeatedly add 2 to this value, till you reach a value of 9
  Run a while loop starting at 1 and ending at 9, incrementing the variable by 2 every time
  `,
  [ATTRS.VAR]: [],
  [ATTRS.EXP]: [],
  [ATTRS.STATE]:[],
  [ATTRS.VAL]: [],
  gameState: GAME_STATE.READY,
  timeLeft: 0,
};

class Instruction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instruction: "Put each corresponding blocks into their own dropzone"
    }
  }

  render() {
    return (
      <div className="left instruction">{this.state.instruction}</div>
    );
  }
}
class Title extends React.Component {
  render() {
    return (
      <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-3xl" style={{ margin: "20px auto" }}>
        <span className="block xl:inline" >Level</span>
        <span className="block text-indigo-600 xl:inline"> 1-3 </span>
      </h1>
    );
  }
}

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: false
    }
  }
  onButtonClickHandler = () => {
    this.setState({ showMessage: true });
  };

  render() {
    return (
      <>
        {this.state.showMessage && <Complete/>}
        <div className="left result">{this.state.showMessage && <p>c = 3<br />You are correct!</p>}</div>
        <div className='right' style={{ margin: "auto" }}>
          <button className="py-3 px-5 font-semibold rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700" onClick={this.onButtonClickHandler}>Submit</button>
        </div>
      </>
    );
  }
}

class Complete extends React.Component {

  render() {
    return (
      <>
        <div className="popwindow">
          <div className="windowtitle text-xl tracking-tight font-bold text-indigo-600">Level Completed</div>
          <div className="windowcontent">
            <div className="windowtext text-xl tracking-tight" >
              Congratulations, you're completed this level.
          </div>
            <div className="windowtext">
              <span className="text-xl tracking-tight">You have unlocked an achievement.</span><br />
              <Link to="/achievements">
                <button className="gamebutton py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700">Check Achievement</button></Link>
            </div>
            <Buttons comp={true} />
          </div>
        </div>
      </>
    );
  }
}


class Buttons extends React.Component {

  restart = () => {
    window.location.reload();
  }
  render() {
    return (
      <div className="buttonGroup">
        <Link to="/level-selection">
          <button className="gamebutton py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700">Return</button>
        </Link>
        <button className="gamebutton py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700" onClick={this.restart}>Restart</button>
      </div>
    );
  }
}

class Game3 extends React.Component {
  state = initialState;

  onDragEnd = ({ source, destination }) => {
    if (!destination) {
      return;
    }

    this.setState(state => {
      return move(state, source, destination);
    });
  };

  restart = () => {
    window.location.reload();
  }
  setHint = () => {
    this.setState({showHint : true});
  }

  render() {
    const { gameState,showHint,hint, timeLeft, bench, ...groups  } = this.state;
    const isDropDisabled = gameState === GAME_STATE.DONE;

    return (
      <>
      <div className='canves'>
        <div className='row'>
          <Instruction />
          <h2 className = "left instruction">{showHint ? hint : ""}</h2>
          <div className="right">
            <Title />
            <div className="buttonGroup">
        <Link to="/level-selection">
          <button className="gamebutton py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700">Return</button>
        </Link>
        <button className="gamebutton py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700" onClick={this.restart}>Restart</button>
        <button className="gamebutton py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700" onClick = {this.setHint}>Hint</button>
      </div>
          </div>
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="row row-auto" style={{ height: "calc(100% - 408px)" }}>
            <div className="left row block bg-indigo-200 rounded-lg p-4 border border-gray-200">
              <Dropzone
                pos="col"
                id={ATTRS.VAR}
                blocks={this.state[ATTRS.VAR]}
                isDropDisabled={isDropDisabled}
              />
            </div>
            <Dropzone
              pos="right"
              id="bench"
              blocks={bench}
              isDropDisabled={isDropDisabled} />
          </div>
        </DragDropContext>
        <div className='row' style={{ bottom: "0px" }}>
          <Result/>
        </div>
      </div>
      </>
    );
  }
}

export default Game3;