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
    }

    create() {
        this.background = this.add.image(0, 0, 'background');
        this.background.setOrigin(0, 0);
        this.audioManager.playBgMusic();
        this.createCoin();
    }

    update(time, delta) {}

    createCoin() {
        this.audioManager.playSfx('coinSfx');
    }

    destroy() {
        if (this.background) this.background.destroy();
        if (this.coin) this.coin.destroy();
        this.removeListeners();
    }
}
