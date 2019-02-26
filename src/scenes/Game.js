import Phaser from 'phaser';
import { List } from 'immutable';
import gameConfig from 'configs/gameConfig';
import spriteConfig from 'configs/spriteConfig';
import AudioManager from 'core/createAudioManager';
import createPlayer from 'entities/createPlayer';
import UI from 'scenes/UI';
import audioConfig from 'configs/audioConfig';
import getFunctionUsage from 'utils/getFunctionUsage';
import canListen from 'components/events/canListen';
import pipe from 'utils/pipe';

/**
 * Responsible for delegating the various levels, holding the various core systems and such.
 */
const Game = function GameFunc() {
    const state = {};
    const sceneInstance = new Phaser.Scene(gameConfig.SCENES.GAME);
    let audioManager;
    let entities = List([]);
    let UIScene;
    let background;

    function getSceneInstance() {
        return sceneInstance;
    }

    function createCoin() {
        audioManager.playSfx(audioConfig.SFX.COIN.KEY);
    }

    function cameraSetup() {
        sceneInstance.cameras.main.setViewport(0, 0, gameConfig.GAME.VIEWWIDTH, gameConfig.GAME.VIEWHEIGHT);
        sceneInstance.cameras.main.setZoom(0.8);
    }

    function addEntities() {
        const numberOfEntities = 3;

        for (let i = 0; i < numberOfEntities; i += 1) {
            entities = entities.push(createPlayer());
        }

        // Log a player entity example, same as in readme.md
        console.log(entities.get(0));
        entities.forEach((e) => {
            e.printInfo();
        });
    }

    sceneInstance.init = () => {
        // After assets are loaded.
        UIScene = UI();
        sceneInstance.scene.add(gameConfig.SCENES.UI, UIScene, true);
        audioManager = AudioManager()
            .setScene(UIScene)
            .setPauseOnBlur(true)
            .init();
    };

    sceneInstance.create = () => {
        background = sceneInstance.add.image(0, 0, spriteConfig.BACKGROUND.KEY);
        background.setOrigin(0, 0);
        audioManager.playMusic();
        createCoin();
        addEntities();
        cameraSetup();
    };

    sceneInstance.update = (time, delta) => {};

    sceneInstance.destroy = () => {
        if (background) sceneInstance.background.destroy();
        if (UI) UI.destroy();
    };

    const localState = {
        // props
        // methods
        getSceneInstance,
    };

    const canListenState = canListen(state);
    const states = [{ state, name: 'state' }, { state: localState, name: 'localState' }, { state: canListenState, name: 'canListen' }];

    getFunctionUsage(states, 'Game');
    return Object.assign(...states.map(s => s.state), {
        // pipes and overrides
        update: pipe(
            state.update, // Phaser 'inheritance' update()/super call to phaser.scene
            localState.update, // internal/local state update()
        ),
        destroy: pipe(
            localState.destroy,
            canListenState.destroy,
        ),
    });
};

export default Game;
