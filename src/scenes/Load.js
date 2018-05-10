import Phaser from 'phaser';
import config from '../config';
import LoadingBar from '../components/LoadingBar';
import { createAudioManager, getAudioManager } from '../components/AudioManager';

export default class LoadScene extends Phaser.Scene {
    constructor() {
        super(config.SCENES.LOAD);
    }

    init() {
        createAudioManager(this);
    }

    preload() {
        this.loadingBar = new LoadingBar(this, window.innerWidth / 2, window.innerHeight / 2);
        this.load.on('complete', () => {
            this.scene.start(config.SCENES.LEVEL1);
            this.destroy();
        });

        this.loadAssets();
    }

    loadAssets() {
        getAudioManager().loadAudio();
        this.loadImages();
        this.loadSpritesheets();
    }

    loadSpritesheets() {
        this.load.atlas('coins', 'assets/spritesheets/coins.png', 'assets/spritesheets/coins.json');
    }

    loadImages() {
        this.load.image('background', 'assets/background.png');
    }

    destroy() {
        if (this.loadingBar) this.loadingBar.destroy();
    }
}
