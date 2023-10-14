import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import {TasksPropsType, Todolist} from "./TodoList";


export type FilterValuesType = 'all' | 'completed' | 'active';
function App() {
    const [tasks, setTasks] = useState<Array<TasksPropsType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redax", isDone: false},
        {id: v1(), title: "Wordpress", isDone: true},
        {id: v1(), title: "TypeScript", isDone: false},
        {id: v1(), title: "Divi Theme", isDone: true},
        {id: v1(), title: "SEO", isDone: true},
    ])

    let [filter, setFilter] = useState<FilterValuesType>('all')

    //фильтруем таски либо "all" либо "completed" либо "active"
    let tasksForTodolist = tasks;
    if (filter === 'completed'){
        tasksForTodolist=tasks.filter(t=> t.isDone)
    }
    if (filter === 'active'){
        tasksForTodolist=tasks.filter(t=> !t.isDone)
    }

    //удаляем task(и)
    function removeTask (id:string){
        let filteredTasks = tasks.filter(t=> t.id !== id)
        setTasks(filteredTasks)
    }

    //пишем функцию для фильтрации тasks автоматически с использованием set функции, для последующего их вызова при клике на кнопки all / completed / active
    function changeValuesTasks (value:FilterValuesType){
        setFilter(value);
    }

    //пишем функцию для добавления task(и)
    function addTask (title: string){
        let newTask ={id: v1(), title: title, isDone: false}
        let newTasks=[newTask, ...tasks]
        setTasks(newTasks)
    }


    return (
        <div className="todolist">
            <Todolist title={"What to learn"} // data
                      tasks={tasksForTodolist} // data
                      removeTask={removeTask} // callback f()=>{}
                      changeValuesTasks={changeValuesTasks} // callback f()=>{}
                    addTask={addTask}

            />
        </div>
    );
}

export default App;
