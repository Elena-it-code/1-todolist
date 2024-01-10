import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};
