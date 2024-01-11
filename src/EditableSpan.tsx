import React, {ChangeEvent, useState} from 'react';

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
            ? <input value={newTitle} onBlur={editHandler} autoFocus onChange={onChangeHandler}/>
            : <span onDoubleClick={editHandler}>{props.oldTitle}</span>

    );
};

