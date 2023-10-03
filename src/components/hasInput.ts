import { SCENES } from 'configs/gameConfig';
import { Scene } from './isScene';

export interface Input extends Scene {
}

function hasInput(state: Input) {
    function getKeyboard() {
        return state.scene.scene.manager.getScene(SCENES.GAME).input.keyboard;
    }

    return {
        getKeyboard,
    };
};

export default hasInput;
