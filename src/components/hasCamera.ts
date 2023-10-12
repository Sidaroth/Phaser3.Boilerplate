import { ExtendedPhaserScene, LifeCycle } from "./isScene";

export interface Camera extends LifeCycle {
    getCamera: () => Phaser.Cameras.Scene2D.Camera;
    setMainCamera: (cam: Phaser.Cameras.Scene2D.Camera) => void;
    setViewport: (x: number, y: number, w: number, h: number) => void;
    setZoom: (zoom: number) => void;
    setSize: (x: number, y: number) => void;
    scene: ExtendedPhaserScene;
}
/**
 * Camera abstraction.
 */
const hasCamera = function hasCameraFunc(state: Camera) {
    let camera: Phaser.Cameras.Scene2D.Camera | undefined;

    function create() {
        camera = state.scene.cameras.main;
    }

    function setMainCamera(cam: Phaser.Cameras.Scene2D.Camera) {
        camera = cam;
    }

    function getCamera() {
        return camera;
    }

    function setViewport(x: number, y: number, w: number, h: number) {
        if (!camera) return;
        camera.setViewport(x, y, w, h);
    }

    function setZoom(zoom: number) {
        if (!camera) return;
        camera.setZoom(zoom);
    }

    function setSize(x: number, y: number) {
        if (!camera) return;
        camera.setSize(x, y);
    }

    return {
        create,
        getCamera,
        setMainCamera,
        setViewport,
        setZoom,
        setSize,
    };
};

export default hasCamera;
