import 'phaser';
import config from '../config';

export default class LoadScene extends Phaser.Scene {
    constructor() {
        super(config.SCENES.LOAD); // A scene key is needed.
    }

    preload() {
        // start loading bar
        // start loading all kinds of assets
        console.log('Load preload');
    }

    create() {
        console.log('Load create');
        this.scene.start(config.SCENES.GAME);
    }
}
