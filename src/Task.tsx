import {FilterValuesType} from "./App";
import {SuperCheckbox} from "./Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import React, {useCallback} from "react";
import {TaskType} from "./Todolist";

export type TaskPropsType = {
    todolistId: string
    filter: FilterValuesType
    tasks: TaskType
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {

    const changeTaskStatusHandler = (tID: string, isDone: boolean) => {
        props.changeTaskStatus(tID, isDone, props.todolistId)
    }
    const onClickHandler = () => props.removeTask(props.tasks.id, props.todolistId)
    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     let newIsDoneValue = e.currentTarget.checked;
    //     props.changeTaskStatus(t.id, newIsDoneValue, props.id);
    // } // вынести над return
    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.tasks.id, newValue, props.todolistId);
    }, [props.changeTaskTitle, props.tasks.id, props.todolistId])


    return (
        <div key={props.tasks.id} className={props.tasks.isDone ? "is-done" : ""}>
            {/*<Checkbox // сделать универсальной компонентой*/}
            {/*    checked={t.isDone}*/}
            {/*    color="primary"*/}
            {/*    onChange={onChangeHandler}*/}
            {/*/>*/}
            <SuperCheckbox isDone={props.tasks.isDone}
                           callback={(isDone) => changeTaskStatusHandler(props.tasks.id, isDone)}/>

            <EditableSpan value={props.tasks.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})