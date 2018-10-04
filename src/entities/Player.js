import isGameEntity from 'components/entities/isGameEntity';
import pipe from 'utils/pipe';

const Player = function PlayerFunc() {
    const state = {};

    function printInfo() {
        console.log(`name: %c${state.name}`, 'color: red');
    }

    const isGameEntityState = isGameEntity(state);
    return Object.assign(state, isGameEntityState, {
        // props
        name: 'my nice player',
        // methods
        printInfo: pipe(
            isGameEntityState.printInfo,
            printInfo,
        ),
    });
};

export default Player;
