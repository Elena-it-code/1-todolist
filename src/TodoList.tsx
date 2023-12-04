import React, {ChangeEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TasksPropsType = {
    id: string
    title: string
    isDone: boolean

}

export type PropsType = {
    title: string
    tasks: Array<TasksPropsType>
    removeTask: (todolistID: string, taskId: string) => void
    changeValuesTasks: (todolistID: string, value: FilterValuesType) => void;
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean)=> void
    filter: FilterValuesType
    todolistID: string
}

export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    //создали стейт для хранения нашей переменной error, которая будет выводить ошубку пользователю, об обязательности моздания title для task / задачи, и state, который будет заставлять React отрисовать/изменить нам JSX в UI
    let [error, setError]=useState<string | null>(null)

    const onNewTaskTitleHandler = (e: { currentTarget: { value: React.SetStateAction<string>; }; }) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            props.addTask(props.todolistID, newTaskTitle);
            setNewTaskTitle('')
        }
    }

    const addTaskHandler = () => {
        // если у нас одно условие, то записать можно в упрощенном варианте
        if (newTaskTitle.trim() !== '') {
            props.addTask(props.todolistID, newTaskTitle.trim());  // newTaskTitle.trim() сделали так, чтобы в локальный стейт отправлялась только очищенная от пробелов по краям строка, но осталась возможность ставить пробел между словами. К примеру: “логин пароль”.По краям пробела быть не может, а между словами пожалуйста.
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    //вариант с return, подходит, если у нас много условий. Это называется многократный возврат функции. Обрывание.
    /*    if (newTaskTitle.trim() === '') {
            return;
        }
        props.addTask(newTaskTitle);
        setNewTaskTitle('')
    }*/

    const onAllChangeValuesTasks = () => {
        props.changeValuesTasks(props.todolistID,'all')
    }
    const onActiveChangeValuesTasks = () => {
        props.changeValuesTasks(props.todolistID,'active')
    }
    const onCompletedChangeValuesTasks = () => {
        props.changeValuesTasks(props.todolistID,'completed')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle} onChange={onNewTaskTitleHandler} onKeyDown={onKeyPressHandler} className={error ? 'error' : ''}/>
                <button onClick={addTaskHandler}>
                    +
                </button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map((t) => {
                        const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
                            props.changeTaskStatus(props.todolistID, t.id,e.currentTarget.checked)
                        }
                        const removeTaskHandler = () => {
                            props.removeTask(props.todolistID, t.id)
                        }
                        return (
                            <li key={t.id} className={t.isDone ?'is-done' : ""}>
                                <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>{t.title}
                                <button onClick={removeTaskHandler}>
                                    x
                                </button>
                            </li>)
                    })}
            </ul>
            <div>
                <button className={props.filter === "all" ? 'active-filter' : ''} onClick={onAllChangeValuesTasks}>
                    All
                </button>
                <button className={props.filter === "active" ? 'active-filter' : ''} onClick={onActiveChangeValuesTasks}>
                    Active
                </button>
                <button className={props.filter === "completed" ? 'active-filter' : ''} onClick={onCompletedChangeValuesTasks}>
                    Completed
                </button>
            </div>
        </div>
    )
}