import 'styles/main.scss';
import Phaser from 'phaser';
import { GAME } from 'configs/gameConfig';

import BootScene from 'scenes/Boot';
import LoadScene from 'scenes/Load';
import Game from 'scenes/Game';
import resizeCanvas from 'utils/resizeCanvas';
import store from './store';
import createMessageBus from 'core/createMessageBus';
import sayHello from 'utils/sayHello';

declare global {
    interface Window {
    }
    interface Document {
        msFullscreenElement?: Element;
        webkitFullscreenElement?: Element;
        mozFullScreenElement?: Element;
        webkitExitFullscreen?: () => void;
        mozCancelFullScreen?: () => void;
        msExitFullscreen?: () => void;
        mozRequestFullScreen?: () => void;
        webkitRequestFullscreen?: () => void;
        msRequestFullscreen?: () => void;
    }

    interface Element {
        mozRequestFullScreen?: () => void;
        webkitRequestFullscreen?: () => void;
        msRequestFullscreen?: () => void;
    }
    
    export const GAME_BRANCH: string;
    export const GAME_VERSION: string;
    export const GAME_TIMESTAMP: string;
    export const IS_DEV: boolean;
}

sayHello();
const phaserConfig = {
    type: Phaser.WEBGL,
    width: GAME.VIEWWIDTH,
    height: GAME.VIEWHEIGHT,
    backgroundColor: '#555555',
    parent: 'game',
    scene: [BootScene().scene, LoadScene().scene, Game().scene],
};

const game = new Phaser.Game(phaserConfig);
store.messageBus = createMessageBus();
store.game = game;

window.addEventListener('resize', resizeCanvas);
