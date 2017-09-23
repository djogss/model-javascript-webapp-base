console.log('Hello World!');
import expect, { createSpy, spyOn, isSpy } from 'expect'
import deepFreeze from 'deep-freeze'
import { createStore, combineReducers } from 'redux'

// import {ReactDOM} from 'react-dom'
import React from 'react'
import ReactDOM from 'react-dom';

// import Todo from './components/Todo'

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
        todos: todos(
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

const todoAppCombined = combineReducers({
    todos,
    visabilitFilter
})
const todoStore = createStore(todoAppCombined);


let todoCounter = 0;
class TodoApp extends React.Component {

    render() {
        return (<div>
            <input ref={node =>{
                this.input = node;
            }}
            />
            <button onClick={() => {
                todoStore.dispatch({
                    type: 'ADD_TODO',
                    text: this.input.value,
                    id: todoCounter++
                });
                this.input.value = '';
                }}>
                AddTodo
                </button>
            <ul>
                {console.log("props", this.props)}
                {this.props.todos.map(todo =>
                    <li key={todo.id}>
                        {todo.text}
                    </li>
                )}
            </ul>
        </div>
        );
    }
}

const render = () => {
    ReactDOM.render(
        <div>
            <TodoApp todos={todoStore.getState().todos} />
        </div>,
        document.getElementById('container')
    )
}
todoStore.subscribe(render)
render();

console.log("state", todoStore.getState())