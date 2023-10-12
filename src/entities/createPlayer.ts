import isGameEntity, { GameEntityState } from 'components/entities/isGameEntity';
import canEmit, { EmitComponent } from 'components/events/canEmit';
import hasPosition, { PositionComponent } from 'components/hasPosition';
import createState from 'utils/createState';
import hasAudio, { Audio } from 'components/hasAudio';
import { SFX } from 'configs/audioConfig';

export interface Player extends PositionComponent, Audio, EmitComponent, GameEntityState {
    name: string;
    printInfo: () => void;
}

const createPlayer = function createPlayerFunc(): Player {
    // variables and functions here are private unless listed below in localState.
    const state = {} as Player;

    function __constructor() {
        state.playSfx(SFX.COIN.KEY);
    }

    function printInfo() {
        console.log(`name: %c${state.name}`, 'color: red');
    }

    // functions and properties listed here will be public.
    const localState = {
        // props
        name: 'Player name',
        // methods
        __constructor,
        printInfo,
    };

    // These are the substates, or components, that describe the functionality of the resulting object.
    return createState('Player', state, {
        localState,
        isGameEntity: isGameEntity(state),
        hasPosition: hasPosition(state),
        hasAudio: hasAudio(state),
        canEmit: canEmit(state),
    });
};

export default createPlayer;
