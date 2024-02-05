import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type PropsType = {
    oldTitle: string
    onClick: (newTitle: string) => void
}

export const EditableSpan = (props: PropsType) => {

    const [edit, setEdit] = useState(false)
    let [newTitle, setNewTitle] = useState(props.oldTitle)

    const editHandler = () => {
        setEdit(!edit)
        if (edit) {
            props.onClick(newTitle)
            /*addTask()*/
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    /*const addTask = () => {
        props.onClick(newTitle)
    }*/

    return (
        edit
            /*2) В EditableSpan сделайте замену input на TextField самостоятельно*/
            /*? <input value={newTitle} onBlur={editHandler} autoFocus onChange={onChangeHandler}/>*/
            ? <TextField size={'small'} variant={"outlined"} value={newTitle} onBlur={editHandler} autoFocus onChange={onChangeHandler}/>
            : <span onDoubleClick={editHandler}>{props.oldTitle}</span>

    );
};

