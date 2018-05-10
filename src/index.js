import Phaser from 'phaser';
import config from './config';

import BootScene from './scenes/Boot';
import LoadScene from './scenes/Load';
import Level1 from './scenes/Level1';

const gameConfig = {
    type: Phaser.WEBGL,
    width: config.GAME.VIEWWIDTH,
    height: config.GAME.VIEWHEIGHT,
    backgroundColor: '#555555',
    parent: 'game',
    scene: [BootScene, LoadScene, Level1],
};

const game = new Phaser.Game(gameConfig);
