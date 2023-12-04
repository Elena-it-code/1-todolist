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
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>(
        [
            {id: todolistID1, title: 'What to learn', filter: 'all'},
            {id: todolistID2, title: 'What to buy', filter: 'all'},
        ]
    )

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: false},
            {id: v1(), title: 'ReactJS2', isDone: false},
            {id: v1(), title: 'Rest API2', isDone: false},
            {id: v1(), title: 'GraphQL2', isDone: false},
        ]
    })

    /*const [tasks, setTasks] = useState<Array<TasksPropsType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redax", isDone: false},
        {id: v1(), title: "TypeScript", isDone: false},
    ])*/
    //удаляем task(и)
    function removeTask(todolistID: string, taskid: string) {
        //let filteredTasks = tasks.filter(t => t.id !== id)
        //setTasks(filteredTasks)
        setTasks({...tasks, [todolistID] : tasks[todolistID].filter(el=>el.id !== taskid)})
    }

    //пишем функцию для фильтрации тasks автоматически с использованием set функции, для последующего их вызова при клике на кнопки all / completed / active
    function changeValuesTasks(todolistID: string, value: FilterValuesType) {
        //setFilter(value);
        setTodolists(todolists.map(el=>el.id === todolistID ? {...el, filter: value} : el))
    }

    //пишем функцию для изменения статуса чекбокса, выполнена на невыполнена
    function changeStatus(taskId: string, isDone: boolean) {
        /*let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks])
        }*/
    }

    //пишем функцию для добавления task(и)
    function addTask(todolistID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistID]: [...tasks[todolistID],newTask]})
        // let newTasks = [newTask, ...tasks]
        // setTasks(newTasks)

    }


    return (
        <div className="todolist">
            {todolists.map(el => {
                let tasksForTodolist = tasks[el.id];
                if (el.filter === 'completed') {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone)
                }
                if (el.filter === 'active') {
                    tasksForTodolist = tasks[el.id].filter(t => !t.isDone)
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
