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
} as const;

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
    [EVENTS.GAME.STARTED]: GameStartedEvent;
    [EVENTS.OTHER.TEST]: OtherEvent;
    [EVENTS.KEYBOARD.KEYDOWN]: KeyboardKeyDownEvent;
    [EVENTS.KEYBOARD.KEYUP]: KeyboardKeyUpEvent;
    [EVENTS.BUTTON.CLICK]: ButtonClickEvent;
}
