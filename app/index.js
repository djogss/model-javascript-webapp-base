console.log('Hello World!');
import expect, { createSpy, spyOn, isSpy } from 'expect'
import { createStore } from 'redux'

const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INC': return state + 1;
        case 'DEC': return state - 1;
        default: return state;
    }
}

expect(counter(1, { type: 'INC' })).toEqual(2)

expect(counter(1, { type: 'DEC' })).toEqual(0)

expect(counter(1, { type: 'UNKNOWN' })).toEqual(1)

expect(counter(undefined, {})).toEqual(0)

console.log("All tests success")

console.log("test success")

const store = createStore(counter);

console.log(store.getState());

const render = () => {
    document.body.innerText = store.getState();
}

const printConsole = () => {
    console.log(store.getState())
}
store.subscribe(render);
store.subscribe(printConsole);
render();

document.addEventListener('click', () => {
    store.dispatch({type:'INC'});
});
