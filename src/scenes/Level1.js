import Phaser from 'phaser';
import config from '../config';
import { getAudioManager } from '../components/AudioManager';

export default class Level1 extends Phaser.Scene {
    constructor() {
        super(config.SCENES.LEVEL1);
    }

    create() {
        this.background = this.add.image(0, 0, 'background');
        this.background.setOrigin(0, 0);
        getAudioManager().playBgMusic();
        this.coin = this.createCoin();
    }

    update(time, delta) {}

    createCoin() {
        this.anims.create({
            key: 'coinAnim',
            frames: this.anims.generateFrameNames('coin', { prefix: 'coin_', end: 6, zeroPad: 1 }),
            repeat: -1,
        });

        getAudioManager().playSfx('coinSfx');
    }

    destroy() {
        if (this.background) this.background.destroy();
        if (this.coin) this.coin.destroy();
    }
}
