const hasPosition = function hasPositionFunc(state) {
    let x = 0;
    let y = 0;

    function setPosition(pos) {
        ({ x, y } = pos);

        return { x, y };
    }

    function getPosition() {
        return { x, y };
    }

    return {
        // props
        // methods
        setPosition,
        getPosition,
    };
};

export default hasPosition;
