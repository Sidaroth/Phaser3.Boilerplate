import { AudioManager } from 'core/createAudioManager';
import store from 'root/store';

export interface Audio {
    getAudioManager(): AudioManager | undefined;
    setAudioManager(manager: AudioManager): void;
    playSfx(key: string): void;
    playMusic(key: string): void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function hasAudio(state: Audio): Audio {
    let audioMan: AudioManager | undefined = store.audioManager;

    function getAudioManager(): AudioManager | undefined {
        return audioMan;
    }

    function setAudioManager(manager: AudioManager) {
        audioMan = manager;
    }

    function playSfx(key: string) {
        if (!audioMan) return;

        audioMan.playSfx(key);
    }

    function playMusic(key: string) {
        if (!audioMan) return;

        audioMan.playMusic(key);
    }

    return {
        getAudioManager,
        setAudioManager,
        playSfx,
        playMusic,
    };
}

export default hasAudio;
