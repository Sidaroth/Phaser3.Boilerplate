import { SCENES } from 'configs/gameConfig';
import Phaser from 'phaser';

export interface LifeCycle {
    init?: () => void
    preload?: () => void
    create?: () => void
    update?: () => void
    destroy?: () => void
}

export type ExtendedPhaserScene = Phaser.Scene & LifeCycle

export interface Scene extends LifeCycle {
    sceneManager?: Phaser.Scenes.ScenePlugin;
    scene: ExtendedPhaserScene;
    addScene: (key: SCENES, sceneRef: ExtendedPhaserScene, autoStart: boolean) => Phaser.Scene | undefined | null;
    removeScene: (sceneRef: ExtendedPhaserScene) => void;
    addImage: (x: number, y: number, key: string, frame?: string) => Phaser.GameObjects.Image;
    removeChild: (key: string) => void;
}

/**
 * Phaser.Scene abstraction.
 * Init -> Preload -> Create -> Update -> Destroy
 */
const isScene = function isSceneFunc(state: Scene, sceneKey: SCENES): Scene {
    if (!sceneKey) {
        throw new Error('Missing sceneKey');
    }



    const scene: ExtendedPhaserScene = new Phaser.Scene(sceneKey) as ExtendedPhaserScene;

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

    function addScene(key: SCENES, sceneRef: ExtendedPhaserScene, autoStart: boolean): Phaser.Scene | null | undefined {
        return state.sceneManager?.add(key, sceneRef, autoStart);
    }

    function removeScene(sceneRef: ExtendedPhaserScene) {
        state.sceneManager?.remove(sceneRef);
    }

    function addImage(x: number, y: number, key: string, frame?: string) {
        return scene.add.image(x, y, key, frame);
    }

    function removeChild(key: string) {
        const child = scene.children.getByName(key);
        child?.removedFromScene()
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
