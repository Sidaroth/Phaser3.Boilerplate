import Phaser from 'phaser';
import config from '../config';

/**
 * Layer/Scene for UI elements.
 */
export default class UI extends Phaser.Scene {
    constructor() {
        super(config.SCENES.UI);
    }

    create() {}

    bringToTop() {
        this.scene.bringToTop();
    }
}
