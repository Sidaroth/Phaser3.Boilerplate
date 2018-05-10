import Phaser from 'phaser';
import config from '../config';
import { createAudioManager } from '../components/AudioManager';

/**
 * Responsible for delegating the various levels, holding the various core systems and such.
 */
export default class Game extends Phaser.Scene {
    audioManager = null;
    documentListeners = [];

    constructor() {
        super(config.SCENES.GAME);
    }

    init() {
        // After assets are loaded.
        this.audioManager = createAudioManager(this);
        this.audioManager.init();
        this.setupListeners();
    }

    setupListeners() {
        document.addEventListener('fullscreenchange', this.fullscreenChangeCallback);
        document.addEventListener('onwebkitfullscreenchange', this.fullscreenChangeCallback);
        document.addEventListener('onmozfullscreenchange', this.fullscreenChangeCallback);
        document.addEventListener('MSFullscreenChange', this.fullscreenChangeCallback);
    }

    removeListeners() {
        this.documentListeners.forEach((listener) => {
            document.removeEventListener(listener);
        });
    }

    create() {
        this.background = this.add.image(0, 0, 'background');
        this.background.setOrigin(0, 0);
        this.audioManager.playBgMusic();
        this.coin = this.createCoin();
    }

    update(time, delta) {}

    createCoin() {
        this.anims.create({
            key: 'coinAnim',
            frames: this.anims.generateFrameNames('coin', { prefix: 'coin_', end: 6, zeroPad: 1 }),
            repeat: -1,
        });

        this.audioManager.playSfx('coinSfx');
    }

    destroy() {
        if (this.background) this.background.destroy();
        if (this.coin) this.coin.destroy();
        this.removeListeners();
    }

    fullscreenChangeCallback(event) {
        console.log('test');
    }
}
