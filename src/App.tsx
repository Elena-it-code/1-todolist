import React from 'react';
import './App.css';
import {TasksPropsType, Todolist} from "./TodoList";


function App() {
    const task1: Array<TasksPropsType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ]

    const task2: Array<TasksPropsType>  = [
        {id: 4, title: "Potato", isDone: false},
        {id: 5, title: "Milk", isDone: false},
        {id: 6, title: "Bread", isDone: true},
    ]

    const task3: Array<TasksPropsType>  = [
        {id: 7, title: "War and Peace", isDone: false},
        {id: 8, title: "Crime and Punishment", isDone: true},
        {id: 9, title: "Idiot", isDone: true},
    ]

    return (
        <div className="todolist">
            <Todolist title={"What to learn"} tasks={task1}/>
            <Todolist title={"What to buy"} tasks={task2}/>
            <Todolist title={"What to read"} tasks={task3}/>
        </div>
    );
}

export default App;
