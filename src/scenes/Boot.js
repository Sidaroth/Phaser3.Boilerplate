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
        this.load.image('loading-bar', 'assets/loader-bar.png');
    }

    create() {
        this.scene.start(config.SCENES.LOAD);
    }
}
