import Phaser from 'phaser';
import config from '../config';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super(config.SCENES.BOOT);
    }

    /**
     * Preload loading bar and needed fonts etc.
     */
    preload() {
        this.load.image('loading-bg', 'assets/loader-bg.png');
    }

    create() {
        this.cameras.main.setSize(config.GAME.VIEWWIDTH, config.GAME.VIEWHEIGHT);
        this.scene.start(config.SCENES.LOAD);
    }
}
