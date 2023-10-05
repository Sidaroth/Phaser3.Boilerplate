export default function sayHello() {
    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
        const args = [
            ` %c %c %c v${GAME_VERSION}; ${GAME_BRANCH} - ${GAME_TIMESTAMP} %c %c`,
            'background: #99ddff; padding:5px 0;',
            'background: #99ddff; padding:5px 0;',
            'color: #99ddff; background: #030307; padding:5px 0;',
            'background: #99ddff; padding:5px 0;',
            'background: #99ddff; padding:5px 0;',
        ];

        window.console.log.apply(console, args);
    } else if (window.console) {
        window.console.log(`${GAME_VERSION}; ${GAME_BRANCH}; ${GAME_TIMESTAMP}`);
    }
}
