import Phaser from 'phaser';
import config from '../config';
import Stats from 'stats-js';
import * as dat from 'dat.gui';

/**
 * Layer/Scene for UI elements.
 */
export default class UI extends Phaser.Scene {
    constructor() {
        super(config.SCENES.UI);
    }

    create() {
        this.setupDatGui();
        this.setupPerformanceStats();
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

    bringToTop() {
        this.scene.bringToTop();
    }
}
