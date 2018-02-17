import Phaser from 'phaser';
import config from './config';

import BootScene from './scenes/Boot';
import LoadScene from './scenes/Load';
import GameScene from './scenes/Game';

const gameConfig = {
    type: Phaser.WEBGL,
    width: config.GAME.VIEWWIDTH,
    height: config.GAME.VIEWHEIGHT,
    parent: 'content',
    scene: [BootScene, LoadScene, GameScene],
};

const game = new Phaser.Game(gameConfig);
