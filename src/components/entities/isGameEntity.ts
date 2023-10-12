import { v4 as uuidv4 } from 'uuid';

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
        id: uuidv4(),
        // methods
        printInfo,
        update,
    };
};

export default isGameEntity;
