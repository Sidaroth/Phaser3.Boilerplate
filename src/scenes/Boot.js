import Phaser from 'phaser';
import gameConfig from 'configs/gameConfig';
import resizeCanvas from 'utils/resizeCanvas';
import getFunctionUsage from 'utils/getFunctionUsage';

// TODO create a hasSceneInstance.js for scenes.
const BootScene = function BootSceneFunc() {
    const state = {};
    const sceneInstance = new Phaser.Scene(gameConfig.SCENES.BOOT);

    // hook into phasers scene lifecycle.
    sceneInstance.create = () => {
        resizeCanvas();
        sceneInstance.cameras.main.setSize(gameConfig.GAME.VIEWWIDTH, gameConfig.GAME.VIEWHEIGHT);
        sceneInstance.scene.start(gameConfig.SCENES.LOAD);
    };

    function getSceneInstance() {
        return sceneInstance;
    }

    const localState = {
        // methods
        getSceneInstance,
    };

    const states = [{ state, name: 'state' }, { state: localState, name: 'localState' }];

    getFunctionUsage(states, 'Boot');
    return Object.assign(...states.map(s => s.state), {
        // pipes and overrides
    });
};

export default BootScene;
