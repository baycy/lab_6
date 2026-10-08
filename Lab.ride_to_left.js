'use strict'

const compose = (...fns) => {
    const f = x => {
        try {
            return fns.reduceRight((result, fn) => fn(result), x);
        } catch (e) {
            f.handlers.forEach(handler => handler(e));
            return undefined;
        }
    };

    f.handlers = [];

    f.on = (event, handler) => {
        if (event === 'error') {
            f.handlers.push(handler);
        }
        return f;
    };

    return f;
};



const add = x => x + 1;
const twice = x => x * 2;
const error = x => {
    throw new Error('Something wrong');
};

const f = compose(add, twice, error);
f.on('error', e => {
    console.log('Error:', e.message);
});

console.log(f(5));