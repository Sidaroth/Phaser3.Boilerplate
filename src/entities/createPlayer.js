import isGameEntity from 'components/entities/isGameEntity';
import pipe from 'utils/pipe';
import canEmit from 'components/events/canEmit';
import getFunctionUsage from 'utils/getFunctionUsage';
import hasPosition from 'components/hasPosition';

const createPlayer = function createPlayerFunc() {
    // This is the base state, which in some cases will be an 'inherited' value, i.e Phaser.Scene
    const state = {};

    function printInfo() {
        console.log(`name: %c${state.name}`, 'color: red');
    }

    const isGameEntityState = isGameEntity(state);
    const hasPositionState = hasPosition(state);
    const canEmitState = canEmit(state);

    const localState = {
        // props
        name: 'Player name',
        // methods
        printInfo,
    };

    // These are the substates, or components, that describe the functionality of the resulting object.
    const states = [
        { state, name: 'state' },
        { state: localState, name: 'localState' },
        { state: isGameEntityState, name: 'isGameEntity' },
        { state: canEmitState, name: 'canEmit' },
        { state: hasPositionState, name: 'hasPosition' },
    ];

    getFunctionUsage(states, 'createPlayer');
    // We compose these substates togheter through using Object.assign when returning a new Player object.
    return Object.assign(...states.map(s => s.state), {
        // pipes and overrides
        printInfo: pipe(
            isGameEntityState.printInfo,
            localState.printInfo,
        ),
    });
};

export default createPlayer;
