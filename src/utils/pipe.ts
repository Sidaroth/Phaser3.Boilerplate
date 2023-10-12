function pipe<T>(...fns: Array<(t: T) => T>): (t: T) => T {
    const emptyFunc: (t: T) => T = v => v;
    return initialVal => fns.reduce((val, fn) => (fn ? fn(val) : emptyFunc(val)), initialVal);
}

export default pipe;
