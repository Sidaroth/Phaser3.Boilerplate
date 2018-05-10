import Phaser from 'phaser';
import config from '../config';
import LoadingBar from '../components/LoadingBar';

export default class LoadScene extends Phaser.Scene {
    constructor() {
        super(config.SCENES.LOAD);
    }

    preload() {
        this.loadingBar = new LoadingBar(this, window.innerWidth / 2, window.innerHeight / 2);
        this.load.on('complete', () => {
            this.scene.start(config.SCENES.GAME);
            this.destroy();
        });

        this.loadAssets();
    }

    loadAssets() {
        this.loadAudio();
        this.loadImages();
        this.loadSpritesheets();
    }

    loadAudio() {
        this.load.audio('bgScore', 'assets/audio/Philipp_Weigl_-_06_-_Full_of_Stars.mp3');
        this.load.audio('coinSfx', 'assets/audio/coin.wav');
    }

    loadSpritesheets() {}

    loadImages() {
        this.load.image('background', 'assets/background.png');
        this.load.image('speaker', 'assets/speaker.png');
        this.load.image('speaker-off', 'assets/speaker-off.png');
    }

    destroy() {
        if (this.loadingBar) this.loadingBar.destroy();
    }
}
