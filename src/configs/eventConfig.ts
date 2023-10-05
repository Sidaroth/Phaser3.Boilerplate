export const EVENTS = {
    GAME: {
        STARTED: 'game_started',
    },
    OTHER: {
        TEST: 'other_event'
    },
    KEYBOARD: {
        KEYDOWN: 'keydown',
        KEYUP: 'keyup',
    },
    BUTTON: {
        CLICK: 'button_click'
    }
}

export interface GameStartedEvent {
    welcomeMessage: string;
}

export interface OtherEvent {
    test: string;
}

export interface KeyboardKeyUpEvent {
    key: string;
    repeat: boolean;
    keyCode: number;
}

export interface KeyboardKeyDownEvent {
    key: string;
    repeat: boolean;
    keyCode: number;
}

export interface ButtonClickEvent {
    buttonName: string;
}

export interface EventData {
    'game_started': GameStartedEvent;
    'other_event': OtherEvent;
    'keydown': KeyboardKeyDownEvent;
    'keyup': KeyboardKeyUpEvent;
    'button_click': ButtonClickEvent;
}