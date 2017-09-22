console.log('Hello World!');
import expect, { createSpy, spyOn, isSpy } from 'expect'
import deepFreeze from 'deep-freeze'
import { createStore } from 'redux'

// import {ReactDOM} from 'react-dom'
import React from 'react'
import ReactDOM from 'react-dom';

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

const Counter = ({ value, onDec, onInc }) => (
    <div>
        <h1>{value}</h1>
        <button onClick={onDec}>-</button>
        <button onClick={onInc}>+</button>
    </div>
);


const render = () => {
    ReactDOM.render(
        <Counter value={store.getState()}
            onDec={() => store.dispatch({ type: 'DEC' })}
            onInc={() => store.dispatch({ type: 'INC' })}
        />,
        document.getElementById('container')
    )
}

const printConsole = () => {
    console.log(store.getState())
}
store.subscribe(render);
store.subscribe(printConsole);
render();

// document.addEventListener('click', () => {
//     store.dispatch({ type: 'INC' });
// });


const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state
            }
            return {
                ...state,
                completed: !state.completed
            };
    }
}

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state,
            todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
            defaut:
            return state;
        default: return state;
    }
}

const testAddTodo = () => {
    const stateBefore = [];
    const action = {
        type: 'ADD_TODO',
        id: 1,
        text: 'Todo one'
    };
    const stateAfter = [
        {
            id: 1,
            text: 'Todo one',
            completed: false
        }
    ];


    deepFreeze(stateBefore)
    deepFreeze(stateAfter)


    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);
}

const testToggleTodo = () => {

    const action = {
        type: 'TOGGLE_TODO',
        id: 1
    }
    const stateBefore = [
        {
            id: 1,
            text: 'Todo one',
            completed: false
        },
        {
            id: 2,
            text: 'Todo two',
            completed: false
        }
    ]
    const stateAfter = [
        {
            id: 1,
            text: 'Todo one',
            completed: true
        },
        {
            id: 2,
            text: 'Todo two',
            completed: false
        }
    ]

    deepFreeze(stateBefore)
    deepFreeze(stateBefore)

    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter)

}

testAddTodo();
testToggleTodo();
console.log("test completed successfully")