import 'styles/main.scss';
import Phaser from 'phaser';
import gameConfig from 'configs/gameConfig';

import BootScene from 'scenes/Boot';
import LoadScene from 'scenes/Load';
import Game from 'scenes/Game';
import resizeCanvas from 'utils/resizeCanvas';
import store from './store';
import createMessageBus from 'core/createMessageBus';

const phaserConfig = {
    type: Phaser.WEBGL,
    width: gameConfig.GAME.VIEWWIDTH,
    height: gameConfig.GAME.VIEWHEIGHT,
    backgroundColor: '#555555',
    parent: 'game',
    scene: [BootScene().getScene(), LoadScene().getScene(), Game().getScene()],
};

store.messageBus = createMessageBus();
const game = new Phaser.Game(phaserConfig);

window.addEventListener('resize', resizeCanvas);
