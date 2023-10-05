export interface Position {
    x: number;
    y: number;
}

export interface PositionState {
    setPosition: (position: Position) => Position;
    setX: (xp: number) => number;
    setY: (yp: number) => number;
    getPosition: () => Position;
    getX: () => number;
    getY: () => number;
}

function hasPosition(state: PositionState): PositionState {
    let x = 0;
    let y = 0;

    function setPosition({ x: xp, y: yp }: Position): Position {
        x = xp;
        y = yp;
        return { x, y };
    }

    function setX(xp: number): number {
        state.setPosition({
            x: xp,
            y
        });
        return xp;
    }

    function setY(yp: number): number {
        state.setPosition({
            x,
            y: yp
        });
        return yp;
    }

    function getPosition(): Position {
        return { x, y };
    }

    function getX(): number {
        return x;
    }

    function getY(): number {
        return y;
    }

    return {
        // props
        // methods
        setPosition,
        setX,
        setY,
        getPosition,
        getX,
        getY,
    };
}

export default hasPosition;
