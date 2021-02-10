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
      instruction: "A variable can be thought of as a container with a name. The container is uniquely named and can be assigned a value, which will then be stored as the contents of the container. The name can then be used to retrieve the contents of the container.\nThe retrieved data can be viewed, modified or used in other, more complex operations. As an example, a variable can be called \"num\" and assigned a value 5 through the code:\nnum = 5\nYour challenge here is to store the values 2 and 3 in two variables called \"a\" and \"b\". \nStore the result of adding the value in these two variables in a new variable called \"c\"."
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

  restart = () => {
    window.location.reload();
  }
  render() {
    return (
      <div className="right buttonGroup">
        <Link to="/level-selection">
          <button className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-blue-500">Return</button>
        </Link>
        <button className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-blue-500" onClick={this.restart}>Restart</button>
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

  submit = () => {
    var stms = []
    var blocks = this.state[ATTRS.PLAY];
    for (var i=0; i < blocks.length; i++) {
      var block = blocks[i];
      var stmt = {
        "block": block.attr1,
        "expr": {
          "block": block.attr3,
          "type": block.attr4,
          "value": block.name.split[-1]
        },
        "ident": {
          "block": block.attr2,
          "ident": block.name.split[0]
        }
      }
      stms.push(stmt);
    }
    console.log(stmt);
    const code = {
      "block": "program",
      "body": {
        "block": "scope",
        "stmts": [
          {
            "block": "assignment",
            "expr": {
              "block": "literal",
              "type": "int",
              "value": "1"
            },
            "ident": {
              "block": "variable",
              "ident": "var1"
            }
          },
          {
            "block": "assignment",
            "expr": {
              "block": "literal",
              "type": "int",
              "value": "3"
            },
            "ident": {
              "block": "variable",
              "ident": "var2"
            }
          },
          {
            "block": "assignment",
            "expr": {
              "block": "binop",
              "expr1": {
                "block": "variable",
                "ident": "var1"
              },
              "expr2": {
                "block": "variable",
                "ident": "var2"
              },
              "oper": "+"
            },
            "ident": {
              "block": "variable",
              "ident": "var3"
            }
          }
        ]
      },
      "ident": {
        "block": "variable",
        "ident": "testProg"
      }
    }
    //need a fetch here to send to backend?
    console.log(code);
  }

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
            <button className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-blue-500" onClick={this.submit}>Submit</button>
          </div></div>
      </div>
    );
  }
}

export default Game;