import config from '../config';

/**
 * Default background Soundtrack is Full of Stars, by Philipp Weigl (http://freemusicarchive.org/music/Philipp_Weigl/Sound-trax/Philipp_Weigl_-_Full_of_Stars)
 * Used under creative commons license CC-BY 4.0 (https://creativecommons.org/licenses/by/4.0/, https://creativecommons.org/licenses/by/4.0/legalcode)
 *
 * Can we extend phaser SoundManager here for cleaner code?
 */

const AudioManager = function createAudioManagerFunc() {
    const state = {};
    let container;
    let muteIcon;
    const muteIdentifier = `${config.GAME.TITLE.replace(/ /g, '_')}_isMuted`; // replace all spaces with _ for safety
    const soundEffects = new Map();
    const backgroundMusic = new Map();

    function init() {
        state.setupMute();
        config.AUDIO.musicKeys.forEach((key) => {
            backgroundMusic.set(key, container.sound.add(key));
        });

        config.AUDIO.sfxKeys.forEach((key) => {
            soundEffects.set(key, container.sound.add(key));
        });

        return state;
    }

    function setContainer(newContainer) {
        container = newContainer;
        return state;
    }

    function setPauseOnBlur(pauseOnBlur) {
        if (container) {
            container.sound.pauseOnBlur = pauseOnBlur; // Keep audio playing even when losing focus.
        }
        return state;
    }

    function playSfx(key) {
        if (soundEffects.has(key)) {
            soundEffects.get(key).play();
        }
    }

    function playBgMusic(key = 'bgScore') {
        if (!state.isBgMusicPlaying && backgroundMusic.has(key)) {
            const bgm = backgroundMusic.get(key);
            bgm.loop = true;
            bgm.volume = 0.7;
            bgm.play();
            state.isBgMusicPlaying = true;
        }
    }

    function isAudioMuted() {
        return localStorage.getItem(muteIdentifier) === 'true';
    }

    function _updateMute() {
        if (state.isAudioMuted()) {
            muteIcon.setTexture('speaker-off');
            container.sound.mute = true;
        } else {
            muteIcon.setTexture('speaker');
            container.sound.mute = false;
        }
    }

    function toggleMute() {
        const muteStatus = (!state.isAudioMuted()).toString();
        localStorage.setItem(muteIdentifier, muteStatus);
        _updateMute();
    }

    function setupMute() {
        muteIcon = container.add.image(1850, 1040, 'speaker');
        muteIcon.setScrollFactor(0);
        muteIcon.tint = config.UI_DEFAULT.tint;
        muteIcon.depth = 3;
        muteIcon.setInteractive();
        muteIcon.on('pointerup', state.toggleMute, state);

        _updateMute();
    }

    function destroy() {
        muteIcon.destroy();
        soundEffects.destroy();
        backgroundMusic.destroy();
    }

    return Object.assign(state, {
        // props
        isBgMusicPlaying: false,
        // methods
        init,
        playSfx,
        setContainer,
        setPauseOnBlur,
        playBgMusic,
        isAudioMuted,
        toggleMute,
        setupMute,
        destroy,
    });
};

/**
 * Audio manager instance, there should only be one. Implementation may change.
 */
export default AudioManager;
