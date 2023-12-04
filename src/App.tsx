import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TasksPropsType, Todolist} from "./TodoList";


export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    let [todolists, setTodolists] = useState<TodolistType[]>(
        [
            {id: v1(), title: 'What to learn', filter: 'all'},
            {id: v1(), title: 'What to buy', filter: 'all'},
        ]
    )

    const [tasks, setTasks] = useState<Array<TasksPropsType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redax", isDone: false},
        {id: v1(), title: "TypeScript", isDone: false},
    ])

    //let [filter, setFilter] = useState<FilterValuesType>('all')

    //фильтруем таски либо "all" либо "completed" либо "active"


    //удаляем task(и)
    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    //пишем функцию для фильтрации тasks автоматически с использованием set функции, для последующего их вызова при клике на кнопки all / completed / active
    function changeValuesTasks(todolistID: string, value: FilterValuesType) {
        //setFilter(value);
        setTodolists(todolists.map(el=>el.id === todolistID ? {...el, filter: value} : el))
    }

    //пишем функцию для изменения статуса чекбокса, выполнена на невыполнена
    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks])
        }
    }

    //пишем функцию для добавления task(и)
    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }


    return (
        <div className="todolist">
            {todolists.map(el => {
                let tasksForTodolist = tasks;
                if (el.filter === 'completed') {
                    tasksForTodolist = tasks.filter(t => t.isDone)
                }
                if (el.filter === 'active') {
                    tasksForTodolist = tasks.filter(t => !t.isDone)
                }
                return (
                    <Todolist title={el.title} // data
                              key={el.id}
                              todolistID={el.id}
                              tasks={tasksForTodolist} // data
                              removeTask={removeTask} // callback f()=>{}
                              changeValuesTasks={changeValuesTasks} // callback f()=>{}
                              changeTaskStatus={changeStatus} // callback f()=>{}
                              addTask={addTask} // callback f()=>{}
                              filter={el.filter}
                    />
                )
            })}
        </div>
    );
}

export default App;
