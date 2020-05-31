import Phaser from 'phaser';

/**
 * Phaser.Scene abstraction.
 * Init -> Preload -> Create -> Update -> Destroy
 */
const isScene = function isSceneFunc(state, sceneKey) {
    if (!sceneKey) {
        throw new Error('Missing sceneKey');
    }

    const scene = new Phaser.Scene(sceneKey);

    // ------ Hook into phasers scene lifecycle -------
    scene.init = () => {
        // The ScenePlugin/Manager is not ready until init has run internally.
        state.sceneManager = scene.scene;
        if (state.init) state.init();
    };

    scene.preload = () => {
        if (state.preload) state.preload();
    };

    scene.create = () => {
        if (state.create) state.create();
    };

    scene.update = () => {
        if (state.update) state.update();
    };


    scene.destroy = () => {
        if (state.destroy) state.destroy();
    };
    // --------------------------------------

    function addScene(key, sceneRef, autoStart) {
        return state.sceneManager.add(key, sceneRef, autoStart);
    }

    function removeScene(sceneRef) {
        state.sceneManager.remove(sceneRef);
    }

    function addImage(x, y, key, frame = undefined) {
        return scene.add.image(x, y, key, frame);
    }

    function removeChild(key) {
        const child = scene[key];
        if (child) child.destroy();
    }

    return {
        sceneManager: undefined,
        scene,
        addScene,
        removeScene,
        addImage,
        removeChild,
    };
};

export default isScene;
