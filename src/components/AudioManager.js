import config from '../config';

/**
 * Default background Soundtrack is Full of Stars, by Philipp Weigl (http://freemusicarchive.org/music/Philipp_Weigl/Sound-trax/Philipp_Weigl_-_Full_of_Stars)
 * Used under creative commons license CC-BY 4.0 (https://creativecommons.org/licenses/by/4.0/, https://creativecommons.org/licenses/by/4.0/legalcode)
 *
 * Can we extend phaser SoundManager here for cleaner code?
 */

class AudioManager {
    soundEffects = new Map();
    backgroundMusic = new Map();
    isBgMusicPlaying = false;
    parent = null;
    mute = null;
    muteIdentifier = 'project_name_isMuted';

    constructor(parent) {
        this.parent = parent;
        this.parent.sound.pauseOnBlur = true; // Keep audio playing even when losing focus.
    }

    init() {
        this.setupMute();
        config.AUDIO.musicKeys.forEach((key) => {
            this.backgroundMusic.set(key, this.parent.sound.add(key));
        });

        config.AUDIO.sfxKeys.forEach((key) => {
            this.soundEffects.set(key, this.parent.sound.add(key));
        });
    }

    playSfx(key) {
        if (this.soundEffects.has(key)) {
            this.soundEffects.get(key).play();
        }
    }

    playBgMusic(key = 'bgScore') {
        if (!this.isBgMusicPlaying && this.backgroundMusic.has(key)) {
            const bgm = this.backgroundMusic.get(key);
            bgm.loop = true;
            bgm.volume = 0.7;
            bgm.play();
            this.isBgMusicPlaying = true;
        }
    }

    /* eslint-disable class-methods-use-this */
    isAudioMuted() {
        return localStorage.getItem(this.muteIdentifier) === 'true';
    }

    toggleMute() {
        const muteStatus = (!this.isAudioMuted()).toString();
        localStorage.setItem(this.muteIdentifier, muteStatus);
        this._updateMute();
    }
    /* eslint-enable class-methods-use-this */

    _updateMute() {
        if (this.isAudioMuted()) {
            this.mute.setTexture('speaker-off');
            this.parent.sound.mute = true;
        } else {
            this.mute.setTexture('speaker');
            this.parent.sound.mute = false;
        }
    }

    setupMute() {
        this.mute = this.parent.add.image(1400, 800, 'speaker');
        this.mute.setScrollFactor(0);
        this.mute.tint = 0xffffff;
        this.mute.depth = 3;
        this.mute.setInteractive();
        this.mute.on('pointerup', this.toggleMute, this);

        this._updateMute();
    }

    destroy() {
        this.soundEffects.destroy();
    }
}

/**
 * Audio manager instance, there should only be one. Implementation may change.
 */
let audioManager = null;
export function getAudioManager() {
    if (audioManager) return audioManager;
    return null;
}

export function createAudioManager(parent) {
    if (!audioManager) {
        audioManager = new AudioManager(parent);
    }
    return audioManager;
}
