import { GAME, UI_DEFAULT } from 'configs/gameConfig';
import { SPEAKER, SPEAKER_OFF } from 'configs/spriteConfig';
import { MUSIC, SFX } from 'configs/audioConfig';
import createState from 'utils/createState';
import { ExtendedPhaserScene } from 'components/isScene';

export interface AudioManager {
    isMusicPlaying: boolean;

    __constructor(): AudioManager,
    playSfx(key: string): void,
    setScene(newScene: ExtendedPhaserScene): AudioManager,
    setPauseOnBlur(pauseOnBlur: boolean): AudioManager,
    playMusic(key?: string): void,
    pauseMusic(): void,
    stopMusic(): void,
    getAudioContext(key?: string): BaseAudioContext | undefined,
    getCurrentSong: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound | undefined,
    getAudioSource(key?: string): AudioBufferSourceNode | undefined,
    getCurrentVolume(): number,
    isAudioMuted(): boolean,
    toggleMute(): void,
    destroy(): void,
}

function createAudioManager(parentScene: ExtendedPhaserScene): AudioManager {
    if (!parentScene) throw new Error('A parent scene must be specified.');

    const state = {} as AudioManager;

    let scene = parentScene;
    let muteIcon: Phaser.GameObjects.Image;
    let currentSong: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound | undefined;

    const muteIdentifier = `${GAME.TITLE.replace(/ /g, '_')}_isMuted`; // replace all spaces with _ for safety
    const soundEffectsMap = new Map<string, Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound>();
    const musicMap = new Map<string, Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound>();
    const currentVolume = 0.7;
    const defaultSongKey = MUSIC.BG_SCORE.KEY;

    function _updateMute() {
        if (state.isAudioMuted()) {
            muteIcon.setTexture(SPEAKER_OFF.KEY);
            scene.sound.mute = true;
        } else {
            muteIcon.setTexture(SPEAKER.KEY);
            scene.sound.mute = false;
        }
    }

    function _setupMute() {
        muteIcon = scene.add.image(1850, 1040, SPEAKER.KEY);
        muteIcon.setScrollFactor(0);
        muteIcon.tint = UI_DEFAULT.tint;
        muteIcon.depth = 3;
        muteIcon.setInteractive();
        muteIcon.on('pointerup', state.toggleMute, state);

        _updateMute();
    }

    function __constructor(): AudioManager {
        _setupMute();

        Object.keys(MUSIC).forEach((objKey) => {
            const music = MUSIC[objKey];
            musicMap.set(music.KEY, scene.sound.add(music.KEY));
        });

        Object.keys(SFX).forEach((objKey) => {
            const sfx = SFX[objKey];
            soundEffectsMap.set(sfx.KEY, scene.sound.add(sfx.KEY));
        });

        state.setPauseOnBlur(true);

        return state;
    }

    function setScene(newScene: ExtendedPhaserScene): AudioManager {
        // TODO move from old to new, if scene is already defined
        scene = newScene;
        return state;
    }

    function setPauseOnBlur(pauseOnBlur: boolean): AudioManager {
        if (scene) {
            scene.sound.pauseOnBlur = pauseOnBlur; // Keep audio playing even when losing focus.
        }
        return state;
    }

    function playSfx(key: string) {
        if (soundEffectsMap.has(key)) {
            console.log('playing', key);
            const sfx = soundEffectsMap.get(key)
            if (sfx) sfx.play();
        }
    }

    function pauseMusic() {
        if (currentSong) {
            currentSong.pause();
        }
        state.isMusicPlaying = false;
    }

    function playMusic(key: string = defaultSongKey) {
        if (!state.isMusicPlaying && musicMap.has(key)) {
            currentSong = musicMap.get(key);
            if (currentSong) {
                currentSong.volume = currentVolume;
                currentSong.play();
                state.isMusicPlaying = true;
            }
        }
    }

    function stopMusic() {
        if (currentSong) {
            currentSong.stop();
            currentSong = undefined;
        }
        state.isMusicPlaying = false;
    }

    function getCurrentVolume() {
        return currentVolume;
    }

    function getCurrentSong() {
        return currentSong;
    }

    function getAudioContext(key: string = defaultSongKey): BaseAudioContext | undefined {
        const music = musicMap.get(key)
        if (music && music instanceof Phaser.Sound.WebAudioSound) {
            return music.source.context;
        }
    }

    function getAudioSource(key: string = defaultSongKey): AudioBufferSourceNode | undefined {
        const music = musicMap.get(key)
        if (music && music instanceof Phaser.Sound.WebAudioSound) {
            return music.source;
        }
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
        // soundEffects.destroy();
        // music.destroy();
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
