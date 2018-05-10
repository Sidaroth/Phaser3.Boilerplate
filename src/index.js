import Phaser from 'phaser';
import config from './config';

import BootScene from './scenes/Boot';
import LoadScene from './scenes/Load';
import Game from './scenes/Game';

const gameConfig = {
    type: Phaser.WEBGL,
    width: config.GAME.VIEWWIDTH,
    height: config.GAME.VIEWHEIGHT,
    backgroundColor: '#555555',
    parent: 'game',
    scene: [BootScene, LoadScene, Game],
};

const game = new Phaser.Game(gameConfig);
