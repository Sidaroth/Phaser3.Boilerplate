import Phaser from 'phaser';
import gameConfig from 'configs/gameConfig';

const BootScene = function BootSceneFunc() {
    const state = new Phaser.Scene(gameConfig.SCENES.BOOT);
    /**
     * Preload loading bar and needed fonts etc.
     */
    function preload() {
        state.load.image('loading-bg', 'assets/images/loader-bg.png');
    }

    function create() {
        state.cameras.main.setSize(gameConfig.GAME.VIEWWIDTH, gameConfig.GAME.VIEWHEIGHT);
        state.scene.start(gameConfig.SCENES.LOAD);
    }

    return Object.assign(state, {
        // props
        // methods
        preload,
        create,
    });
};

export default BootScene;
