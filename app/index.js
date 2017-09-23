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

const getVisibleTodos = (
    todos,
    filter
) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed);
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed);
    }
}
const visabilitFilter = (state = 'SHOW_ALL', action) => {
    console.log("visability filter reducer", action.type);
    console.log("visability filter reducer", action.filter);
    switch (action.type) {
        case 'SET_VISABILITY_FILTER':
            return action.filter;
        // case 'SHOW_ACTIVE':
        //     return this.props.todos.map(todo => {
        //         !todol.completed
        //     });
        // case 'SHOW_COMPLETED':
        //     console.log("filtering only completed")
        //     return this.props.todos.map(todo => {
        //         todol.completed
        //     });

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

// class FilterLink extends React.Component {

//     render() {


//         return (
//                 <a href='#'
//                     onClick={() =>
//                         todoStore.dispatch({
//                             type: 'SET_VISABILITY_FILTER',
//                             filter:this.props.filter
//                         })
//                     }
//                 >
//                 {this.props.filter}
//                 </a>
//         );
//     }
// }

// Functional component example
// const TodoList = ({ todos, onTodoClick }) => (
// {todos.map(todo => onTodoClick(todo.id)} /> )}
// );


const FilterLink = ({
    filter,
    currentFilter,
    children
}) => {
    console.log('FilterLink filter', filter)
    console.log('FilterLink currentFilter', currentFilter)
    console.log('FilterLink children', children)
    if (currentFilter === filter) {
        return <span>{children}</span>
    }
    return (
        <a href='#'
            onClick={e => {
                e.preventDefault();
                todoStore.dispatch({
                    type: 'SET_VISABILITY_FILTER',
                    filter
                })
            }}
        >
            {children}
        </a>
    );
}


const TodoC = ({
onClick,
    completed,
    text
}) => (
        <li
            onClick={onClick}
            style={{
                textDecoration:
                completed ?
                    'line-through' :
                    'none'
            }}>
            {text}
        </li>
    );

const TodoList = ({
    todos,
    onTodoClick
}) => (
        <ul>
            {todos.map(t =>
                <TodoC
                    key={t.id}
                    {...t}
                    onClick={() => onTodoClick(t.id)}

                />
            )}
        </ul>
    );

const SimpleTitle = ({
    title
}) => (
        <h2>{title}</h2>
    );
let todoCounter = 0;
class TodoApp extends React.Component {

    render() {
        console.log('THE STATE', this.props)
        // debugger
        const {
            todos,
            visabilitFilter
        } = this.props;

        const visibleTodos = getVisibleTodos(
            todos,
            visabilitFilter
        )
        console.log("visible todos ", visibleTodos);
        return (<div>
            <SimpleTitle title='this is the ToDo app' />
            <input ref={node => {
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

            <p>
                Show:
            {' '}
                <FilterLink
                    filter='SHOW_ALL'
                    currentFilter={visabilitFilter}
                >
                    All
            </FilterLink>
                {' '}
                <FilterLink
                    filter='SHOW_ACTIVE'
                    currentFilter={visabilitFilter}
                >
                    Active
            </FilterLink>
                {' '}
                <FilterLink
                    filter='SHOW_COMPLETED'
                    currentFilter={visabilitFilter}
                >
                    Completed
            </FilterLink>
            </p>
                {console.log("props", this.props)}
                <TodoList todos={visibleTodos}
                    onTodoClick={id =>{
                        todoStore.dispatch({
                            type:'TOGGLE_TODO',
                            id
                        })
                    }}
                />
        </div>
        );
    }
}

const render = () => {
    ReactDOM.render(
        <div>
            <TodoApp {...todoStore.getState() } />
        </div>,
        document.getElementById('container')
    )
}

todoStore.dispatch({
    type: 'ADD_TODO',
    id: 1,
    text: 'dummy todo'
})
todoStore.dispatch({
    type: 'ADD_TODO',
    id: 2,
    text: 'dummy todo 2'
})
todoStore.dispatch({
    type: 'ADD_TODO',
    id: 3,
    text: 'dummy todo 3'
})
todoStore.subscribe(render)
render();

console.log("state", todoStore.getState())