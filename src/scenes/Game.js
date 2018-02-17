import 'phaser';
import config from '../config';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super(config.SCENES.GAME); // A scene key is needed.
    }

    preload() {
        // Load fonts/loading bar etc.
        console.log('Game preload');
    }

    create() {
        console.log('Game create');
    }
}
