import React, {useState} from "react";
import {FilterValuesType} from "./App";

export type TasksPropsType = {
    id: string
    title: string
    isDone: boolean

}

export type PropsType = {
    title: string
    tasks: Array<TasksPropsType>
    removeTask: (id: string) => void
    changeValuesTasks: (value: FilterValuesType) => void;
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')

    const onNewTaskTitleHandler = (e: { currentTarget: { value: React.SetStateAction<string>; }; }) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (event: any) => { // не подключаются импорты из React для этого события. Времнно установила any
        if (event.key === 'Enter') {
            props.addTask(newTaskTitle);
            setNewTaskTitle('')
        }
    }

    const addTaskHandler =() => {
        props.addTask(newTaskTitle);
        setNewTaskTitle('')
    }

    const onAllChangeValuesTasks =() => {
        props.changeValuesTasks('all')
    }
    const onActiveChangeValuesTasks =() => {
        props.changeValuesTasks('active')
    }
    const onCompletedChangeValuesTasks =() => {
        props.changeValuesTasks('completed')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle} onChange={onNewTaskTitleHandler} onKeyDown={onKeyPressHandler}/>
                <button onClick={addTaskHandler}>
                    +
                </button>
            </div>
            <ul>
                {
                    props.tasks.map((t) =>{
                        const removeTaskHandler =() => {
                            props.removeTask(t.id)
                        }
                        return(
                        <li><input type="checkbox" checked={t.isDone}/>{t.title}
                            <button onClick={removeTaskHandler}>
                                x
                            </button>
                        </li>)
                })}
            </ul>
            <div>
                <button onClick={onAllChangeValuesTasks}>
                    All
                </button>
                <button onClick={onActiveChangeValuesTasks}>
                    Active
                </button>
                <button onClick={onCompletedChangeValuesTasks}>
                    Completed
                </button>
            </div>
        </div>
    )
}