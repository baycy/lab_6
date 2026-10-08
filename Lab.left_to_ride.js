const pipe = (...fns) => {
    if (fns.some(fn => typeof fn !== 'function')) {
        throw new Error('Your arguments must be functions');
    }

    return x => fns.reduce((result, fn) => fn(result), x);
};

const inc = x => ++x;
const twice = x => x * 2;
const cube = x => x ** 3;

const f = pipe(inc, 67, cube);

console.log(f(5));