import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { HEROES, COMICS } from './Data';
import { shuffle, move, GAME_STATE } from './utils';
import Dropzone from './Dropzone';

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
        
      </>
    );
  }
}

export default Game;