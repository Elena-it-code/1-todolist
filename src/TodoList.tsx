import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    updateTask: (todolistId: string, taskId:string, newTitle: string) => void
    updateTodolist: (todolistId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {
    /*let [title, setTitle] = useState("")*/ //локальный стейт для ввода title в input
    /*let [error, setError] = useState<string | null>(null)*/ //локальный стейт для вывода сообщения об ошибке

    /*const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.addTask(newTitle, props.id);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }*/

    /*const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }*/

    /*const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }*/

    const removeTodolist = () => props.removeTodolist(props.id)
    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const addTaskHandler = (newTitle: string) => { // функция посредник. Принимает id из props и newTitle, указали так, потому что данные которые приходят от детей родителю передается через callback(и)!!!
        props.addTask(newTitle, props.id)
    }
    const updateTodolistHandler =(newTitle: string)=>{
        props.updateTodolist(props.id, newTitle)
    }

    const updateTaskHandler = (tId: string, newTitle: string)=>{
        props.updateTask(props.id, tId, newTitle)
    }


    return <div>
        <h3> {/*{props.title}*/}
            <EditableSpan oldTitle={props.title} onClick={updateTodolistHandler}/>
            {/*<button onClick={removeTodolist}>x</button>*/}
            <IconButton onClick={removeTodolist}> {/*Устанавливаем иконку в качестве кнопки 1) А кнопки удаления тудулиста заменим на компонент IconButton с иконкой (компонент Delete) внутри:*/}
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm onClick={addTaskHandler}/>
        {/*<div>*/}
        {/*    <input value={title}*/}
        {/*           onChange={onChangeHandler}*/}
        {/*           onKeyPress={onKeyPressHandler}*/}
        {/*           className={error ? "error" : ""}*/}
        {/*    />*/}
        {/*    <button onClick={addTask}>+</button>*/}
        {/*    {error && <div className="error-message">{error}</div>}*/}
        {/*</div>*/}
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }

                    /*const updateTaskHandler = (newTitle: string)=>{
                        props.updateTask(props.id, t.id, newTitle)
                    }*/



                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        {/*1) Заменим обычный <input type=’checkbox’> на чекбокс из библиотеки:*/}
                        {/*<input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>*/}
                        <Checkbox onChange={onChangeHandler} checked={t.isDone}/>
                        {/*<EditableSpan oldTitle={t.title} onClick={updateTaskHandler}/>*/}
                        <EditableSpan oldTitle={t.title} onClick={(newTitle)=>updateTaskHandler(t.id, newTitle)}/>
                        {/*<span>{t.title}</span>*/}
                        {/*<button onClick={onClickHandler}>x</button>*/} {/*скопировали наш onClick={onClickHandler} и свтавили уже в нашу компоненту от MUI IconButton */}
                        <IconButton onClick={onClickHandler}> {/* 2) По аналогии, самостоятельно заменим кнопку удаления таски на компонент IconButton с иконкой внутри.*/}
                            <Delete/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            {/*код без использования MUI*/}
            {/*<button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>*/}
            {/*
            Кнопки для фильтров
                1) Кнопки для фильтров тоже заменим на компонент Button
                Во время замены сохраните className. По сути вам нужно просто заменить маленькую букву b в слове button на большую B
                2) Давайте кнопки фильтрации сделаем разноцветными.
               Для этого установите для кнопки атрибут (проп) color:
               3) Если хотите, чтобы они выглядели как кнопки (или как ссылки), поиграйтесь с передачей в пропсы variant={}
               4) Кнопки фильтра.. непонятно какая нажата, давайте это визуализируем, например, вот так (заменив className на variant):
            */}
            <Button color={"success"} variant={props.filter === 'all' ? "contained" : "text"}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button color={"primary"} variant={props.filter === 'active' ? "contained" : "text"}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button color={"secondary"} variant={props.filter === 'completed' ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}


