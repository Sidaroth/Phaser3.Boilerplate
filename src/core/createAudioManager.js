import gameConfig from 'configs/gameConfig';
import spriteConfig from 'configs/spriteConfig';
import audioConfig from 'configs/audioConfig';
import createState from 'utils/createState';

const createAudioManager = function createAudioManagerFunc(parentScene) {
    if (!parentScene) throw new Error('A parent scene must be specified.');

    const state = {};

    let scene = parentScene;
    let muteIcon;
    let currentSong;

    const muteIdentifier = `${gameConfig.GAME.TITLE.replace(/ /g, '_')}_isMuted`; // replace all spaces with _ for safety
    const soundEffects = new Map();
    const music = new Map();
    const currentVolume = 0.7;
    const defaultSongKey = audioConfig.MUSIC.BG_SCORE.KEY;

    function _updateMute() {
        if (state.isAudioMuted()) {
            muteIcon.setTexture(spriteConfig.SPEAKER_OFF.KEY);
            scene.sound.mute = true;
        } else {
            muteIcon.setTexture(spriteConfig.SPEAKER.KEY);
            scene.sound.mute = false;
        }
    }

    function _setupMute() {
        muteIcon = scene.add.image(1850, 1040, spriteConfig.SPEAKER.KEY);
        muteIcon.setScrollFactor(0);
        muteIcon.tint = gameConfig.UI_DEFAULT.tint;
        muteIcon.depth = 3;
        muteIcon.setInteractive();
        muteIcon.on('pointerup', state.toggleMute, state);

        _updateMute();
    }

    function __constructor() {
        _setupMute();

        Object.keys(audioConfig.MUSIC).forEach((objKey) => {
            const MUSIC = audioConfig.MUSIC[objKey];
            music.set(MUSIC.KEY, scene.sound.add(MUSIC.KEY));
        });

        Object.keys(audioConfig.SFX).forEach((objKey) => {
            const SFX = audioConfig.SFX[objKey];
            soundEffects.set(SFX.KEY, scene.sound.add(SFX.KEY));
        });

        state.setPauseOnBlur(true);

        return state;
    }

    function setScene(newScene) {
        // TODO move from old to new, if scene is already defined
        scene = newScene;
        return state;
    }

    function setPauseOnBlur(pauseOnBlur) {
        if (scene) {
            scene.sound.pauseOnBlur = pauseOnBlur; // Keep audio playing even when losing focus.
        }
        return state;
    }

    function playSfx(key) {
        if (soundEffects.has(key)) {
            console.log('playing', key);
            soundEffects.get(key).play();
        }
    }

    function pauseMusic() {
        if (currentSong) {
            currentSong.pause();
        }
        state.isMusicPlaying = false;
    }

    function playMusic(key = defaultSongKey) {
        if (!state.isMusicPlaying && music.has(key)) {
            currentSong = music.get(key);
            currentSong.volume = currentVolume;
            currentSong.play();
            state.isMusicPlaying = true;
        }
    }

    function stopMusic() {
        if (currentSong) {
            currentSong.stop();
            currentSong = null;
        }
        state.isMusicPlaying = false;
    }

    function getCurrentVolume() {
        return currentVolume;
    }

    function getCurrentSong() {
        return currentSong;
    }

    function getAudioContext(key = defaultSongKey) {
        return music.get(key).source.context;
    }

    function getAudioSource(key = defaultSongKey) {
        return music.get(key).source;
    }

    function isAudioMuted() {
        return localStorage.getItem(muteIdentifier) === 'true';
    }

    function toggleMute() {
        const muteStatus = (!state.isAudioMuted()).toString();
        localStorage.setItem(muteIdentifier, muteStatus);
        _updateMute();
    }

    function destroy() {
        state.stopMusic();
        muteIcon.destroy();
        soundEffects.destroy();
        music.destroy();
    }

    const localState = {
        // props
        isMusicPlaying: false,
        // methods
        __constructor,
        playSfx,
        setScene,
        setPauseOnBlur,
        playMusic,
        pauseMusic,
        stopMusic,
        getAudioContext,
        getCurrentSong,
        getAudioSource,
        getCurrentVolume,
        isAudioMuted,
        toggleMute,
        destroy,
    };

    return createState('AudioManager', state, {
        localState,
    });
};

/**
 * Audio manager instance, there should only be one. Implementation may change.
 */
export default createAudioManager;
