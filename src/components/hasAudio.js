import store from 'root/store';

const hasAudio = function hasAudioFunc(state) {
    let audioMan = store.audioManager;

    function getAudioManager() {
        return audioMan;
    }

    function setAudioManager(manager) {
        audioMan = manager;
    }

    function playSfx(key) {
        if (!audioMan) return;

        audioMan.playSfx(key);
    }

    function playMusic(key) {
        if (!audioMan) return;

        audioMan.playMusic(key);
    }

    return {
        getAudioManager,
        setAudioManager,
        playSfx,
        playMusic,
    };
};

export default hasAudio;
