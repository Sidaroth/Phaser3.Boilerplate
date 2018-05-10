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
        this.addCoin();
    }

    update(time, delta) {}

    addCoin() {
        this.anims.create({
            key: 'coinAnim',
            frames: this.anims.generateFrameNames('coin', { prefix: 'coin_', end: 6, zeroPad: 1 }),
            repeat: -1,
        });

        getAudioManager().playSfx('coinSfx');
    }
}
