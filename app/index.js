console.log('Hello World!');
import expect, { createSpy, spyOn, isSpy } from 'expect'
import deepFreeze from 'deep-freeze'
import { createStore, combineReducers } from 'redux'

// import {ReactDOM} from 'react-dom'
import React from 'react'
import ReactDOM from 'react-dom';

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


// Container - provides behaviour connects component with todostore
class FilterLink extends React.Component {

    componentDidMount() {
        const {todoStore} = this.props;
        this.unsusbcribe = todoStore.subscribe(() =>
            this.forceUpdate()
        );
    }

    componentWillUnmount() {
        this.unsusbcribe
    }

    render() {

        const props = this.props;
        const {todoStore} = props;
        let state = todoStore.getState();

        return (
            <Link
                active={props.filter === state.visabilitFilter}
                onFilterClick={() => {
                    todoStore.dispatch({
                        type: 'SET_VISABILITY_FILTER',
                        filter: props.filter
                    })
                }
                }
            >
                {props.children}
            </Link>
        );
    }
}

// Container - provides behaviour connects component with todostore

class VisibleTodos extends React.Component {

    componentDidMount() {
        const {todoStore} = this.props;
        this.unsusbcribe = todoStore.subscribe(() =>
            this.forceUpdate()
        );
    }

    componentWillUnmount(){
        this.unsusbcribe
    }
   
    render() {

        const props = this.props;
        const {todoStore} = this.props;
        let state = todoStore.getState();
        return (
            <TodoList todos={getVisibleTodos(
                state.todos,
                state.visabilitFilter
            )}
                onTodoClick={id => {
                    todoStore.dispatch({
                        type: 'TOGGLE_TODO',
                        id
                    })
                }}
            />
        )
    }
}

// Representation layer component
const Link = ({ active, children, onFilterClick }) => {

    if (active) {
        return <span>{children}</span>
    }
    return (
        <a href='#'
            onClick={e => {
                e.preventDefault();
                onFilterClick()
            }}
        >
            {children}
        </a>
    );
}

// Representation layer component
const FilterMenu = ({todoStore}) => (
    <div>
        <p>
            Show:
        {' '}
            <FilterLink
                filter='SHOW_ALL'
                todoStore={todoStore}
            >
                All
        </FilterLink>
            {' '}
            <FilterLink
                filter='SHOW_ACTIVE'
                todoStore={todoStore}
            >
                Active
        </FilterLink>
            {' '}
            <FilterLink
                filter='SHOW_COMPLETED'
                todoStore={todoStore}
            >
                Completed
        </FilterLink>
        </p>
    </div>
);

// Representation layer component
const TodoC = ({ onClick, completed, text }) => (
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

// Representation layer component
const TodoList = ({ todos, onTodoClick }) => (
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

// Representation layer component
const SimpleTitle = ({ title }) => (
    <h2>{title}</h2>
);

// Representation layer component
const AddTodo = ({todoStore}) => {
    let input;
    return (
        <div>
            <input ref={node => {
                input = node;
            }} />
            <button onClick={() => {
                todoStore.dispatch({
                    type: 'ADD_TODO',
                    text: input.value,
                    id: todoCounter++
                });

                input.value = '';
            }}>
                AddTodo
        </button>
        </div>
    )
}

let todoCounter = 0;
const TodoApp = ({ todoStore }) => (
    <div>
        <SimpleTitle title='this is the ToDo app' />
        <AddTodo todoStore={todoStore} />
        <FilterMenu todoStore={todoStore}/>
        <VisibleTodos todoStore={todoStore} />
    </div>
)


ReactDOM.render(
    <div>
        <TodoApp todoStore={createStore(todoAppCombined)}/>
    </div>,
    document.getElementById('container')
)