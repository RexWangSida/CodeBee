import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { BLOCKS, ATTRS } from './DataS';
import { shuffle, move, GAME_STATE } from './utils';
import Dropzone from './Dropzone';
import { Link } from 'react-router-dom';
import './Game.css';

const initialState = {
    // we initialize the state by populating the bench with a shuffled collection of blocks
    bench: shuffle(BLOCKS),
    hint: "Do wahtever you want.",
    showHint: false,
    showTut: false,
    [ATTRS.VAR]: [],
    [ATTRS.OP]: [],
    [ATTRS.VAL]: [],
};

class Instruction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            instruction: "This is the sandbox, it contains all the statements we have, just play with them!",
            hint: ""
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
                <span className="block text-indigo-600 xl:inline"> Sandbox </span>
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
    };

    render() {
        return (
            <>
                {this.state.showMessage && this.state.answer && <Complete />}
                <div className="left result">{this.state.showMessage && this.state.answer && <p>c = 4<br />You are correct!</p>}{this.state.showMessage && !this.state.answer && <p>Your answer is unable to compile, please retry.</p>}</div>
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

class Tutorial extends React.Component {
    render() {
        return (
            <>
                <div className="popwindow tut">
                    <div className="windowtitle text-xl tracking-tight font-bold text-indigo-600">Tutorial</div>
                    <div className="windowcontent">
                        <div className="windowtext text-l tracking-tight" >
                            Hello, and welcome to CodeBee!<br></br><br></br>
                            For the first exercise, we will go over the basics of CodeBee and how to use it.<br></br>
                            CodeBee has 4 basic 'sections' that you need to be aware of. First is the instruction box (what you are reading). The problems you must complete will be placed here. Directly below the screen is the coding area, where you actually solve the problem being asked. To do this, you must fill each column with code to generate the correct response. These blocks are found on the right side of the screen. They are dragged into the columns. Lastly, at the bottom of the screen, there is the code output. This is where your answer will be generated.<br></br>
                            In the instruction area, there are some buttons which you can click. First is the 'run' button which will use your code to generate an output. Next is the 'back' button which will move you to the level select screen. Lastly is the 'hint' button, giving you additional information to solve the problem.<br></br>
                            To program, you must first know what a 'statement' is. A statement is simply a line of code which will do something. Statements are ran in a sequential fashion. They can declare 'variables' (simple names which can be assigned a value) or control which statements are executed next.<br></br>
                            The most simple statement is an assignment. This will assign some value with a text name, so when you use the name again, you will get the value instead. This name is then called a 'variable'. In CodeBee, you can perform variable assignment by the following:<br></br><br></br>
                            [Text Name]<br></br>
                            [=]<br></br>
                            [Value]<br></br><br></br>
                            The variable name block (Text Name) must be a sequence of letters with no spaces. The Value can contain other names, numbers and operations (like addition and subtraction). The result of the Value block will determine what will be assigned to the name.<br></br>
                            Note that if a name has not been assigned, it cannot be used within the Value block.
                            </div>
                        <div className="windowtext">
                                <button className="gamebutton py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700" style={{marginLeft:"calc(50% - 40px)"}}onClick={this.props.onClick}>I got it</button>
                        </div>
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
                {this.props.comp ? <Link to="/second"><button className="gamebutton py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700">Next</button></Link> : <button className="gamebutton py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700">Hint</button>}
            </div>
        );
    }
}

class Sandbox extends React.Component {
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

    setTut = () => {
        this.setState({ showTut: true });
    }

    closeTut = () => {
        this.setState({ showTut: false });
    }

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
        const { gameState, showHint, hint, bench } = this.state;
        const isDropDisabled = gameState === GAME_STATE.DONE;

        return (
            <div className='canves'>
                <>{this.state.showTut && <Tutorial onClick={this.closeTut}/>}</>
                <div className='row'>
                    <Instruction />
                    <h2 className="left instruction">{showHint ? hint : ""}</h2>
                    <div className="right">
                        <Title />
                        <div className="buttonGroup">
                            <button className="gamebutton py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700" onClick={this.setTut}>How to play</button>
                            <Link to="/level-selection">
                                <button className="gamebutton py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700">Return</button>
                            </Link>
                            <button className="gamebutton py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700" onClick={this.restart}>Restart</button>
                            <button className="gamebutton py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700" onClick={this.setHint}>Hint</button>
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

export default Sandbox;