import { GAME, SCENES } from 'configs/gameConfig';
import resizeCanvas from 'utils/resizeCanvas';
import isScene, { LifeCycle, SceneState } from 'components/isScene';
import createState from 'utils/createState';
import hasCamera, { Camera } from 'components/hasCamera';

export interface BootScene extends SceneState, Camera, LifeCycle { }

const BootScene = function BootSceneFunc() {
    const state: BootScene = {} as BootScene;

    // hook into phasers scene lifecycle.
    function create() {
        resizeCanvas();
        state.setSize(GAME.VIEWWIDTH, GAME.VIEWHEIGHT);
        state?.sceneManager?.start(SCENES.LOAD);
    }

    const localState = {
        // methods
        create,
    };

    return createState<BootScene>('Boot', state, {
        localState,
        isScene: isScene(state, SCENES.BOOT),
        hasCamera: hasCamera(state),
    });
};

export default BootScene;
