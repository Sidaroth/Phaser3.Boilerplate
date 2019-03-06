import isGameEntity from 'components/entities/isGameEntity';
import canEmit from 'components/events/canEmit';
import hasPosition from 'components/hasPosition';
import createState from 'utils/createState';

const createPlayer = function createPlayerFunc() {
    // variables and functions here are private unless listed below in localState.
    const state = {};

    function printInfo() {
        console.log(`name: %c${state.name}`, 'color: red');
    }

    // functions and properties listed here will be public.
    const localState = {
        // props
        name: 'Player name',
        // methods
        printInfo,
    };

    // These are the substates, or components, that describe the functionality of the resulting object.
    return createState('Player', state, {
        localState,
        isGameEntity: isGameEntity(state),
        hasPosition: hasPosition(state),
        canEmit: canEmit(state),
    });
};

export default createPlayer;
