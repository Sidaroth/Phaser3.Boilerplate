import gameConfig from 'configs/gameConfig';
import resizeCanvas from 'utils/resizeCanvas';
import isScene from 'components/isScene';
import createState from 'utils/createState';
import hasCamera from 'components/hasCamera';

const BootScene = function BootSceneFunc() {
    const state = {};

    // hook into phasers scene lifecycle.
    function create() {
        resizeCanvas();
        state.setSize(gameConfig.GAME.VIEWWIDTH, gameConfig.GAME.VIEWHEIGHT);
        state.sceneManager.start(gameConfig.SCENES.LOAD);
    }

    const localState = {
        // methods
        create,
    };

    return createState('Boot', state, {
        localState,
        isScene: isScene(state, gameConfig.SCENES.BOOT),
        hasCamera: hasCamera(state),
    });
};

export default BootScene;
