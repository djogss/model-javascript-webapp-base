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

const todoApp = (state = {}, action) => {
    // debugger
    return {
        todoArray: todos(
            state.todoArray, 
            action
        ),
        visabilitFilter: visabilitFilter(
            state.visabilitFilter, 
            action
        )
    }
}
const visabilitFilter = (state = 'SHOW_ALL', action) => {
    console.log("visability filter reducer", action.type);
    switch (action.type) {
        case 'SET_VISABILITY_FILTER':
            return action.filter;
        default: return state;
    }
}

const todos = (state = [], action) => {
    console.log("todo reducer", action.type);
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


const testVisabilityFilter = () => {
    const stateBefore = [
        {
            id: 1,
            text: 'Todo one',
            completed: false,
        },
        {
            id: 2,
            text: 'Todo two',
            completed: true
        }
    ];

    const action = {
        type: 'SET_VISABILITY_FILTER',
        filter: 'SHOW_COMPLETED'
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

// testAddTodo();
// testToggleTodo();
console.log("test completed successfully")

const todoStore = createStore(todoApp);

console.log("Initial state")
console.log(todoStore.getState())

console.log("Dispatching ADD_TODO")
todoStore.dispatch({ type: 'ADD_TODO', id: 1, text: 'First item' })

console.log("Current state")
console.log(todoStore.getState())
console.log("---------------")


console.log("Dispatching ADD_TODO 2")
todoStore.dispatch({ type: 'ADD_TODO', id: 1, text: 'First item2' })

console.log("Current state 2")
console.log(todoStore.getState())
console.log("---------------")

console.log("Dispatching ADD_TODO 3")
todoStore.dispatch({ type: 'SET_VISABILITY_FILTER' })

console.log("Current state 3")
console.log(todoStore.getState())
console.log("---------------")