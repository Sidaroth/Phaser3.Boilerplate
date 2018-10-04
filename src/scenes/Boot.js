import Phaser from 'phaser';
import config from '../config';

const BootScene = function BootSceneFunc() {
    const state = new Phaser.Scene(config.SCENES.BOOT);
    /**
     * Preload loading bar and needed fonts etc.
     */
    function preload() {
        state.load.image('loading-bg', 'assets/images/loader-bg.png');
    }

    function create() {
        state.cameras.main.setSize(config.GAME.VIEWWIDTH, config.GAME.VIEWHEIGHT);
        state.scene.start(config.SCENES.LOAD);
    }

    return Object.assign(state, {
        // props
        // methods
        preload,
        create,
    });
};

export default BootScene;
