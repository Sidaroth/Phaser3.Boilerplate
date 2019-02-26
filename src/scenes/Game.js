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
    const state = new Phaser.Scene(gameConfig.SCENES.GAME);
    let audioManager;
    let entities = List([]);
    let UIScene;
    let background;

    function createCoin() {
        audioManager.playSfx(audioConfig.SFX.COIN.KEY);
    }

    function cameraSetup() {
        // state.cameras.main.startFollow(state.player); // or whatever else.
        state.cameras.main.setViewport(0, 0, gameConfig.GAME.VIEWWIDTH, gameConfig.GAME.VIEWHEIGHT);
        state.cameras.main.setZoom(0.8);
    }

    function addEntities() {
        const numberOfEntities = 3;

        for (let i = 0; i < numberOfEntities; i += 1) {
            entities = entities.push(createPlayer());
        }

        // Log a player entity example, same as in readme.md
        console.log(entities[0]);
        entities.forEach((e) => {
            e.printInfo();
        });
    }

    function init() {
        // After assets are loaded.
        UIScene = UI();
        state.scene.add(gameConfig.SCENES.UI, UIScene, true);
        audioManager = AudioManager()
            .setScene(UIScene)
            .setPauseOnBlur(true)
            .init();
    }

    function create() {
        background = state.add.image(0, 0, spriteConfig.BACKGROUND.KEY);
        background.setOrigin(0, 0);
        audioManager.playMusic();
        createCoin();
        addEntities();
        cameraSetup();
    }

    function update(time, delta) {}

    function destroy() {
        if (background) state.background.destroy();
        if (UI) UI.destroy();
    }

    const localState = {
        // props
        // methods
        init,
        create,
        update,
        destroy,
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
