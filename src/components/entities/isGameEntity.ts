import getUUID from 'utils/getUUID';

export interface GameEntityState {
    id: string;

    printInfo(): void;
    update(): void;
}

const isGameEntity = function isGameEntityFunc(state: GameEntityState): GameEntityState {
    function printInfo() {
        console.log(`id: %c${state.id}`, 'color: yellow');
    }

    function update() { }

    return {
        // props
        id: getUUID(),
        // methods
        printInfo,
        update,
    };
};

export default isGameEntity;
