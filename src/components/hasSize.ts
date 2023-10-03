export interface Size {
    width: number;
    height: number;
}

export interface SizeState {
    setSize: (size: Size) => Size;
    setWidth: (wp: number) => number;
    setHeight: (hp: number) => number;
    getSize: () => Size;
    getWidth: () => number;
    getHeight: () => number;
}

function hasSize(state: SizeState): SizeState {
    let width = 0;
    let height = 0;

    function setSize({ width: wp, height: hp }: Size): Size {
        width = wp;
        height = hp;

        return { width, height };
    }

    function setWidth(wp: number): number {
        state.setSize({
            width: wp,
            height
        });
        return wp;
    }

    function setHeight(hp: number): number {
        state.setSize({
            width,
            height: hp
        });
        return hp;
    }

    function getSize(): Size {
        return { width, height };
    }

    function getWidth(): number {
        return width;
    }

    function getHeight(): number {
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
