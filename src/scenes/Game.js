import Phaser from 'phaser';
import { List } from 'immutable';
import config from '../config';
import { createAudioManager } from '../components/AudioManager';
import Box from '../entities/box';
import UI from './UI';
import Stats from 'stats-js';
import * as dat from 'dat.gui';

/**
 * Responsible for delegating the various levels, holding the various core systems and such.
 */
export default class Game extends Phaser.Scene {
    audioManager = null;
    documentListeners = List([]);
    entities = List([]);
    UI = null;
    fpsStats = null;
    msStats = null;

    constructor() {
        super(config.SCENES.GAME);
    }

    init() {
        // After assets are loaded.
        this.UI = new UI();
        this.scene.add(config.SCENES.UI, this.UI, true);
        this.audioManager = createAudioManager(this.UI);
        this.setupDatGui();
    }

    setupDatGui() {
        this.gui = new dat.GUI();
        this.gui.addFolder('Test folder');

        this.guiData = {
            name: 'name',
        };
        const guiController = this.gui.add(this.guiData, 'name');
        guiController.onFinishChange((name) => {
            console.log(name);
        });
    }

    create() {
        this.background = this.add.image(0, 0, 'background');
        this.background.setOrigin(0, 0);
        this.audioManager.playBgMusic();
        this.createCoin();
        this.addEntities();
        this.setupPerformanceStats();
    }

    addEntities() {
        const numberOfEntities = 25;
        for (let i = 0; i < numberOfEntities; i += 1) {
            this.entities = this.entities.push(new Box());
        }

        console.log(this.entities);
    }

    setupPerformanceStats() {
        this.fpsStats = new Stats();
        this.msStats = new Stats();
        this.fpsStats.setMode(0);
        this.msStats.setMode(1);

        this.fpsStats.domElement.style.position = 'absolute';
        this.fpsStats.domElement.style.left = '0px';
        this.fpsStats.domElement.style.top = '0px';

        this.msStats.domElement.style.position = 'absolute';
        this.msStats.domElement.style.left = '80px';
        this.msStats.domElement.style.top = '0px';

        document.body.appendChild(this.fpsStats.domElement);
        document.body.appendChild(this.msStats.domElement);

        this.events.on('preupdate', () => {
            this.fpsStats.begin();
            this.msStats.begin();
        });
        this.events.on('postupdate', () => {
            this.fpsStats.end();
            this.msStats.end();
        });
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
