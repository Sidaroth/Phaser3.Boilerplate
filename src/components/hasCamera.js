
/**
 * Camera abstraction.
 */
const hasCamera = function hasCameraFunc(state) {
    let camera;

    function create() {
        camera = state.scene.cameras.main;
    }

    function setMainCamera(cam) {
        camera = cam;
    }

    function getCamera() {
        return camera;
    }

    function setViewport(x, y, w, h) {
        if (!camera) return;
        camera.setViewport(x, y, w, h);
    }

    function setZoom(zoom) {
        if (!camera) return;
        camera.setZoom(zoom);
    }

    function setSize(x, y) {
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
