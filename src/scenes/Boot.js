import Phaser from 'phaser';
import config from '../config';

const BootScene = function BootSceneFunc() {
    const state = {};
    /**
     * Preload loading bar and needed fonts etc.
     */
    function preload() {
        state.load.image('loading-bg', 'assets/images/loader-bg.png');
        console.log('preload');
    }

    function create() {
        state.cameras.main.setSize(config.GAME.VIEWWIDTH, config.GAME.VIEWHEIGHT);
        state.scene.start(config.SCENES.LOAD);
        console.log('create');
    }

    Object.assign(state, new Phaser.Scene(config.SCENES.BOOT), {
        // props
        preload,
        create,
    });
    return state;
};

export default BootScene;
