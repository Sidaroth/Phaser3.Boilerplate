import 'phaser';
import config from '../config';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super(config.SCENES.BOOT); // A scene key is needed.
    }

    preload() {
        // Load fonts/loading bar etc.
        console.log('boot preload');
    }

    create() {
        console.log('boot create');
        this.scene.start(config.SCENES.LOAD);
    }
}
