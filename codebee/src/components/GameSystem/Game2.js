import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { BLOCKS, ATTRS } from './Data3';
import { shuffle, move, GAME_STATE, getTotalScore } from './utils';
import Dropzone from './Dropzone';
import { Link } from 'react-router-dom';
import './Game.css';

const initialState = {
  // we initialize the state by populating the bench with a shuffled collection of blocks
  bench: shuffle(BLOCKS),
  showHint: false,
  hint: `You are trying to create the series 1 3 5 7 9\n You can start with the number 1, and then repeatedly add 2 to this value, till you reach a value of 9\n Run a while loop starting at 1 and ending at 9, incrementing the variable by 2 every time\n  `,
  [ATTRS.VAR]: [],
  [ATTRS.EXP]: [],
  [ATTRS.STATE]: [],
  [ATTRS.VAL]: [],
};

class Instruction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instruction: "A while loop performs a certain operation till a certain condition becomes false. It can be used to repeatedly perform an action for a fixed number of times. Here, your challenge is to start with 1, and print out a series of odd numbers in ascending order, such that the last number in the series is 9, and each number is 2 larger than the previous number.",
      hint: ""
    }
  }

  render() {
    return (
      <>
        <div className="left instruction">{this.state.instruction}</div>
      </>
    );
  }
}
class Title extends React.Component {
  render() {
    return (
      <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-3xl" style={{ margin: "20px auto" }}>
        <span className="block xl:inline" >Level</span>
        <span className="block text-indigo-600 xl:inline"> 1-2 </span>
      </h1>
    );
  }
}

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: false,
      answer: false
    }
  }
  onButtonClickHandler = () => {
    // this.props.submit();
    this.setState({ showMessage: true });
    // console.log(this.props.blocks);
    // console.log(this.props.blocks[0] == 3 && this.props.blocks[1] == 2 && this.props.blocks[2] == 1 && this.props.blocks[3] == 3);
    if (this.props.blocks[0] == 3 && this.props.blocks[1] == 2 && this.props.blocks[2] == 1 && this.props.blocks[3] == 3) {
      this.setState({ answer: true });
    }
  };

  render() {
    return (
      <>
        {this.state.showMessage && this.state.answer && <Complete />}
        <div className="left result">{this.state.showMessage && this.state.answer && <p>1<br />3<br />5<br />7<br />9<br />You are correct!</p>}{this.state.showMessage && !this.state.answer && <p>Unable to parse, please retry.</p>}</div>
        <div className='right' style={{ margin: "auto" }}>
          <button className="gamebutton py-3 px-5 font-semibold rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700" onClick={this.onButtonClickHandler}>Submit</button>
          {this.state.showMessage && !this.state.answer && <button className="gamebutton py-3 px-5 font-semibold rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700" onClick={window.location.reload.bind(window.location)}>Restart</button>}
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
            {/* <div className="windowtext">
              <span className="text-xl tracking-tight">You have unlocked an achievement.</span><br />
              <Link to="/achievements">
                <button className="gamebutton py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700">Check Achievement</button></Link>
            </div> */}
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
        {this.props.comp ? <Link to="/third"><button className="gamebutton py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700">Next</button></Link> : <button className="gamebutton py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700">Hint</button>}
      </div>
    );
  }
}

class Game2 extends React.Component {
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
    this.setState({ showHint: true });
  }
  render() {
    const { gameState, showHint, hint, bench } = this.state;
    const isDropDisabled = gameState === GAME_STATE.DONE;

    return (
      <>
        <div className='canves'>
          <div className='row'>

            <Instruction />
            <h2 className="left instruction" >{showHint ? hint : ""}</h2>
            <div className="right">
              <Title />
              <div className="buttonGroup">
                <Link to="/level-selection">
                  <button className="gamebutton py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700">Return</button>
                </Link>
                <button className="gamebutton py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700" onClick={this.restart}>Restart</button>
                <button className="gamebutton py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700" onClick={this.setHint}>Hint</button>
              </div>
            </div>
          </div>
          <DragDropContext onDragEnd={this.onDragEnd}>
            {/* <div className="left">
              <div class="max-w-screen-xl mx-auto px-4">
                <div class="-mx-6 flex flex-wrap">
                  <div class="w-full p-3 sm:w-1/4 lg:w-1/4">
                    <h2>Statements</h2>
                  </div>
                  <div class="w-full p-3 sm:w-1/4 lg:w-1/4">
                    <h2>Variables</h2>
                  </div>
                  <div class="w-full p-3 sm:w-1/4 lg:w-1/4">
                    <h2>Expressions</h2>
                  </div>
                  <div class="w-full p-3 sm:w-1/4 lg:w-1/4">
                    <h2>Values</h2>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="row row-auto" style={{ height: "calc(100% - 408px)" }}>
              <div className="row row-auto block bg-indigo-200 rounded-lg p-4 border border-gray-200" >
                <Dropzone
                  pos="col"
                  id={ATTRS.STATE}
                  blocks={this.state[ATTRS.STATE]}
                  isDropDisabled={isDropDisabled}
                />
                <Dropzone
                  pos="col"
                  id={ATTRS.VAR}
                  blocks={this.state[ATTRS.VAR]}
                  isDropDisabled={isDropDisabled}
                />
                <Dropzone
                  pos="col"
                  id={ATTRS.EXP}
                  blocks={this.state[ATTRS.EXP]}
                  isDropDisabled={isDropDisabled}
                />
                <Dropzone
                  pos="col"
                  id={ATTRS.VAL}
                  blocks={this.state[ATTRS.VAL]}
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
            <Result blocks={[this.state[ATTRS.STATE].length, this.state[ATTRS.VAR].length, this.state[ATTRS.EXP].length, this.state[ATTRS.VAL].length]} submit={this.submit}/>
          </div>
        </div>
      </>
    );
  }
}

export default Game2;