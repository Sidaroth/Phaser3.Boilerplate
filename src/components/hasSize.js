const hasSize = function hasSizeFunc(state) {
    let width = 0;
    let height = 0;

    function setSize({ w: wp, h: hp }) {
        width = wp;
        height = hp;

        return { width, height };
    }

    function setWidth(wp) {
        state.setSize({ w: wp, h: height });
        return wp;
    }

    function setHeight(hp) {
        state.setSize({ w: width, h: hp });
        return hp;
    }

    function getSize() {
        return { w: width, h: height };
    }

    function getWidth() {
        return width;
    }

    function getHeight() {
        return height;
    }

    return {
        // props
        // methods
        setSize,
        setWidth,
        setHeight,
        getSize,
        getWidth,
        getHeight,
    };
};

export default hasSize;
