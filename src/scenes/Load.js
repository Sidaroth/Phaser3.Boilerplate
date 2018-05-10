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
        const text = this.add.text(config.GAME.VIEWWIDTH / 2 - 20, config.GAME.VIEWHEIGHT / 2 - 20, 'loading', {
            font: '16px Arial',
            fill: '#eeeeee',
            align: 'center',
        });

        this.loadingBar = new LoadingBar(this);
        this.load.on('complete', () => {
            console.log('loading complete!');
            this.scene.start(config.SCENES.LEVEL1);
        });

        this.loadAssets();
    }

    loadAssets() {
        this.loadImages();
        this.loadSpritesheets();
        getAudioManager().loadAudio();
    }

    loadSpritesheets() {
        this.load.atlas('coins', 'assets/spritesheets/coins.png', 'assets/spritesheets/coins.json');
    }

    loadImages() {
        this.load.image('background', 'assets/background.png');
    }
}
