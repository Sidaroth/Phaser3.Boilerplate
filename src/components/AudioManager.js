/**
 * Default background Soundtrack is Full of Stars, by Philipp Weigl (http://freemusicarchive.org/music/Philipp_Weigl/Sound-trax/Philipp_Weigl_-_Full_of_Stars)
 * Used under creative commons license CC-BY 4.0 (https://creativecommons.org/licenses/by/4.0/, https://creativecommons.org/licenses/by/4.0/legalcode)
 */

class AudioManager {
    soundEffects = new Map();
    backgroundMusic = undefined;
    isBgMusicPlaying = false;
    parent = null;

    constructor(parent) {
        this.parent = parent;
    }

    playSfx(key) {
        if (this.soundEffects.has(key)) {
            this.soundEffects.get(key).play();
        }
    }

    playBgMusic() {
        if (this.backgroundMusic && !this.isBgMusicPlaying) {
            this.backgroundMusic.play();
            this.isBgMusicPlaying = true;
        }
    }

    loadAudio() {
        // music
        this.parent.load.audio('bgScore', 'assets/audio/Philipp_Weigl_-_06_-_Full_of_Stars.mp3');

        // sfx
        this.parent.load.audio('coinSfx', 'assets/audio/coin.wav');

        // add to stores.
        this.parent.load.on('complete', () => {
            this.backgroundMusic = this.parent.sound.add('bgScore');
            this.soundEffects.set('coinSfx', this.parent.sound.add('coinSfx'));
        });
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
    audioManager = new AudioManager(parent);
    return audioManager;
}
