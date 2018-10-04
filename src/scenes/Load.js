import Phaser from 'phaser';
import config from '../config';
import LoadingBar from '../components/LoadingBar';

const LoadScene = function LoadSceneFunc() {
    const state = {};
    let loadingBar;

    function loadAudio() {
        state.load.audio('bgScore', 'assets/audio/Philipp_Weigl_-_06_-_Full_of_Stars.mp3');
        state.load.audio('coinSfx', 'assets/audio/coin.wav');
    }

    function loadSpritesheets() {}

    function loadMaps() {}

    function loadImages() {
        state.load.image('background', 'assets/images/background.png');
        state.load.image('speaker', 'assets/images/speaker.png');
        state.load.image('speaker-off', 'assets/images/speaker-off.png');
    }

    function loadAssets() {
        loadAudio();
        loadImages();
        loadSpritesheets();
        loadMaps();
    }

    function preload() {
        loadingBar = new LoadingBar(state, window.innerWidth / 2, window.innerHeight / 2);
        state.load.on('complete', () => {
            state.scene.start(config.SCENES.GAME);
            state.destroy();
        });

        loadAssets();
    }

    function destroy() {
        if (loadingBar) loadingBar.destroy();
    }

    Object.assign(state, new Phaser.Scene(config.SCENES.LOAD), {
        // props
        preload,
        destroy,
    });
    return state;
};

export default LoadScene;
