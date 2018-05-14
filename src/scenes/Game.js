import Phaser from 'phaser';
import { List } from 'immutable';
import config from '../config';
import { createAudioManager } from '../components/AudioManager';
import Box from '../entities/box';
import UI from './UI';

/**
 * Responsible for delegating the various levels, holding the various core systems and such.
 */
export default class Game extends Phaser.Scene {
    audioManager = null;
    documentListeners = List([]);
    entities = List([]);
    UI = null;

    constructor() {
        super(config.SCENES.GAME);
    }

    init() {
        // After assets are loaded.
        this.UI = new UI();
        this.scene.add(config.SCENES.UI, this.UI, true);
        this.audioManager = createAudioManager(this.UI);
    }

    create() {
        this.background = this.add.image(0, 0, 'background');
        this.background.setOrigin(0, 0);
        this.audioManager.playBgMusic();
        this.createCoin();
        this.addEntities();
    }

    addEntities() {
        const numberOfEntities = 25;
        for (let i = 0; i < numberOfEntities; i += 1) {
            this.entities = this.entities.push(new Box());
        }

        console.log(this.entities);
    }

    update(time, delta) {}

    createCoin() {
        this.audioManager.playSfx('coinSfx');
    }

    cameraSetup() {
        this.cameras.main.startFollow(this.vehicles.get(0));
        this.cameras.main.setViewport(0, 0, config.GAME.VIEWWIDTH, config.GAME.VIEWHEIGHT);
        this.cameras.main.setZoom(0.8);
    }

    destroy() {
        if (this.background) this.background.destroy();
        if (this.coin) this.coin.destroy();
        this.removeListeners();
    }
}
