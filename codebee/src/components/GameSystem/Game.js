import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { HEROES, COMICS } from './custom/data';
import { shuffle, move, GAME_STATE } from './custom/utils';

import Modal from './components/Modal';
import Header from './components/Header';
import Dropzone from './components/Dropzone';
import Footer from './components/Footer';

const GAME_DURATION = 1000 * 30; // 30 seconds

const initialState = {
  // we initialize the state by populating the bench with a shuffled collection of heroes
  bench: shuffle(HEROES),
  [COMICS.DC]: [],
  [COMICS.MARVEL]: [],
  gameState: GAME_STATE.READY,
  timeLeft: 0,
};

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
      <>
        <Header gameState={gameState} timeLeft={timeLeft} endGame={this.endGame} />
        {this.state.gameState !== GAME_STATE.PLAYING && (
          <Modal
            startGame={this.startGame}
            resetGame={this.resetGame}
            timeLeft={timeLeft}
            gameState={gameState}
            groups={groups}
          />
        )}
        {(this.state.gameState === GAME_STATE.PLAYING ||
          this.state.gameState === GAME_STATE.DONE) && (
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="container">
              <div className="columns">
                <Dropzone
                  id={COMICS.MARVEL}
                  heroes={this.state[COMICS.MARVEL]}
                  isDropDisabled={isDropDisabled}
                />
                <Dropzone id="bench" heroes={bench} isDropDisabled={isDropDisabled} />
                <Dropzone
                  id={COMICS.DC}
                  heroes={this.state[COMICS.DC]}
                  isDropDisabled={isDropDisabled}
                />
              </div>
            </div>
          </DragDropContext>
        )}
        <Footer />
      </>
    );
  }
}

export default Game;