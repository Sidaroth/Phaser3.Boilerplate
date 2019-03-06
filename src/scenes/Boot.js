import gameConfig from 'configs/gameConfig';
import resizeCanvas from 'utils/resizeCanvas';
import getFunctionUsage from 'utils/getFunctionUsage';
import isScene from 'components/isScene';

// TODO create a hasSceneInstance.js for scenes.
const BootScene = function BootSceneFunc() {
    const state = {};

    // hook into phasers scene lifecycle.
    function create() {
        resizeCanvas();
        state.getScene().cameras.main.setSize(gameConfig.GAME.VIEWWIDTH, gameConfig.GAME.VIEWHEIGHT);
        state.getScene().scene.start(gameConfig.SCENES.LOAD);
    }

    const localState = {
        // methods
        create,
    };

    const isSceneState = isScene(state, gameConfig.SCENES.BOOT);

    const states = [{ state, name: 'state' }, { state: localState, name: 'localState' }, { state: isSceneState, name: 'isScene' }];

    getFunctionUsage(states, 'Boot');
    return Object.assign(...states.map(s => s.state), {
        // pipes and overrides
    });
};

export default BootScene;
