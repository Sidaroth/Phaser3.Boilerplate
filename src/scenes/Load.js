import Phaser from 'phaser';
import gameConfig from 'configs/gameConfig';
import createLoadingBar from 'core/createLoadingBar';
import spriteConfig from 'configs/spriteConfig';
import audioConfig from 'configs/audioConfig';
import getFunctionUsage from 'utils/getFunctionUsage';

const LoadScene = function LoadSceneFunc() {
    const state = {};
    const sceneInstance = new Phaser.Scene(gameConfig.SCENES.LOAD);
    let loadingBar;

    function loadAudio() {
        // load MUSIC
        Object.keys(audioConfig.MUSIC).forEach((objKey) => {
            const AUDIO = audioConfig.MUSIC[objKey];
            sceneInstance.load.audio(AUDIO.KEY, AUDIO.PATH);
        });

        // load SFX
        Object.keys(audioConfig.SFX).forEach((objKey) => {
            const SFX = audioConfig.SFX[objKey];
            sceneInstance.load.audio(SFX.KEY, SFX.PATH);
        });
    }

    function loadSpritesheets() {}

    function loadMaps() {}

    function loadImages() {
        Object.keys(spriteConfig).forEach((objKey) => {
            const SPRITE = spriteConfig[objKey];
            sceneInstance.load.image(SPRITE.KEY, SPRITE.PATH);
        });
    }

    function loadAssets() {
        loadAudio();
        loadImages();
        loadSpritesheets();
        loadMaps();
    }

    function getSceneInstance() {
        return sceneInstance;
    }

    // hook into phasers scene lifecycle.
    sceneInstance.preload = () => {
        loadingBar = createLoadingBar(sceneInstance);
        loadingBar.setPosition({ x: gameConfig.GAME.VIEWWIDTH / 2, y: gameConfig.GAME.VIEWHEIGHT / 2 });
        loadingBar.setSize({ w: gameConfig.GAME.VIEWWIDTH * 0.4, h: gameConfig.GAME.VIEWHEIGHT * 0.025 });

        sceneInstance.load.on('complete', () => {
            sceneInstance.scene.start(gameConfig.SCENES.GAME);
            sceneInstance.destroy();
        });

        loadAssets();
    };

    // hook into phasers scene lifecycle.
    sceneInstance.destroy = () => {
        if (loadingBar) loadingBar.destroy();
    };

    const localState = {
        // props
        // methods
        getSceneInstance,
    };

    const states = [{ state, name: 'state' }, { state: localState, name: 'localState' }];

    getFunctionUsage(states, 'LoadState');
    return Object.assign(...states.map(s => s.state), {
        // pipes and overrides
    });
};

export default LoadScene;
