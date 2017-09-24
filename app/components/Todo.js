import React from 'react'

export default class Todo extends React.Component {

    constructor(){
        super();
    }
    render() {
        return (<div>
            <h2>Toto title</h2>
            <input  name='TODO'/>
            <button onClick={this.addTodoAction}>Add todo</button>
        </div>
        );
    }

    addTodoAction(){
        console.log("add Todo clicked!")
    }
}
