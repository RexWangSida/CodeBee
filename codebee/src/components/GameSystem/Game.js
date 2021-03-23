import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { BLOCKS, ATTRS } from './Data';
import { shuffle, move, GAME_STATE } from './utils';
import Dropzone from './Dropzone';
import { Link } from 'react-router-dom';
import './Game.css';

const initialState = {
    // we initialize the state by populating the bench with a shuffled collection of blocks
    bench: shuffle(BLOCKS),
    [ATTRS.VAR]: [],
    [ATTRS.OP]: [],
    [ATTRS.VAL]: [],
};

class Instruction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            instruction: "A variable can be thought of as a container with a name. The container is uniquely named and can be assigned a value, which will then be stored as the contents of the container. The name can then be used to retrieve the contents of the container.\nThe retrieved data can be viewed, modified or used in other, more complex operations. As an example, a variable can be called \"num\" and assigned a value 5 through the code:\nnum = 5\nYour challenge here is to store the values 1 and 3 in two variables called \"a\" and \"b\". \nStore the result of adding the value in these two variables in a new variable called \"c\"."
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
                <span className="block text-indigo-600 xl:inline"> 1-1 </span>
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
        if (this.props.blocks.length != 0) {
            this.setState({ answer: true });
        }
    };

    render() {
        return (
            <>
                {this.state.showMessage && this.state.answer && <Complete />}
                <div className="left result">{this.state.showMessage && this.state.answer && <p>c = 4<br />You are correct!</p>}{this.state.showMessage && !this.state.answer && <p>Unable to parse, please retry.</p>}</div>
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
                {this.props.comp && <Link to="/second"><button className="gamebutton py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700">Next</button></Link>}
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
        // var stms = []
        // var blocks = this.state[ATTRS.PLAY];
        // for (var i=0; i < blocks.length; i++) {
        //   var block = blocks[i];
        //   var stmt = {
        //     "block": block.attr1,
        //     "expr": {
        //       "block": block.attr3,
        //       "type": block.attr4,
        //       "value": block.name.split[-1]
        //     },
        //     "ident": {
        //       "block": block.attr2,
        //       "ident": block.name.split[0]
        //     }
        //   }
        //   stms.push(stmt);
        // }
        // console.log(stmt);
        //need a fetch here to send to backend?
    }

    render() {
        const { gameState, timeLeft, bench, ...groups } = this.state;
        const isDropDisabled = gameState === GAME_STATE.DONE;

        return (
            <div className='canves'>
                <div className='row'>
                    <Instruction />
                    <div className="right">
                        <Title />
                        <Buttons />
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
                            <Dropzone
                                pos="col"
                                id={ATTRS.OP}
                                blocks={this.state[ATTRS.OP]}
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
                    <Result blocks={this.state[ATTRS.VAR]} submit={this.submit} />
                </div>
            </div>
        );
    }
}

export default Game;