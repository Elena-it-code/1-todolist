import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "@mui/material";

type PropsType = {
    onClick: (newTitle:string)=> void // оставляем только title, это "тупая" компонента - универсальная, она работает только с titile
}

export const AddItemForm = (props:PropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.onClick(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => { // функция нажатия на Enter для отправки
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }
    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            {/*А что если все равно что-то “не то” и не хочется сильно углубляться в библиотеку? Тогда можно при необходимости через style. К примеру:
               <Button style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}/>
                  Так вы можете не только размер задать, но и цвет и т.д.*/}
            <Button onClick={addTask} variant={"contained"} color={"primary"} size={"small"}>+</Button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};
