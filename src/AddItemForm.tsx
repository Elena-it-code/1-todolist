import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from "@mui/material/Button";

type PropsType = {
    onClick: (newTitle: string) => void // оставляем только title, это "тупая" компонента - универсальная, она работает только с titile
}

export const AddItemForm = (props: PropsType) => {
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

    // Вынесли в отдельный объект стили для кнопки Button
    const styleButton = {
        maxWidth: '40px',
        maxHeight: '40px',
        minWidth: '40px',
        minHeight: '40px',
    }

    return (
        <div>
            {/*1) Давайте обычный input в AddItemForm заменим на компонент TextField:*/}
            {/*<input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />*/}
            {/* <TextField size={"small"}
                       variant={"outlined-"}
                       label={'outlined'}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}*/}
            <TextField
                size={"small"}
                id="outlined-basic"
                /*label="outlined"*/ /*по умолчанию стоит, удаляем , устанавлмваем свои данные свою логику*/
                error={!!error}
                label={error ? error : "type sth..."}
                variant="outlined"
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                /*className={error ? "error" : ""}*/
                // пишем атрибут error это boolean, он будет подтягивать это значение error из нашего state, а у нас error это string, мы не можем поставить ее поэтому ипсользуем перебивание типа двойным знаком !! error, т.е. "псевдоИстина и  псевдоЛожь"
                /* helperText={error}*/ // по умолчанию стоит, лучше им не позоваться
            />
            {/*/* error={!!error} // лучше не использовать от библиотеки error , хотя можно
                 helperText={error}*/ // лучше не использовать от библиотеки error , хотя можно*/}
                /*Отображение ошибок
                1) Давайте переделаем отображение ошибки при попытке добавить пустую запись.
                Сейчас className у нас хоть и добавляется при наличии ошибки:
                но он, по разным причинам игнорируется. Удалим className вовсе.
                2) Чтобы добавить ошибку в TextField, нужно задать ему в пропсы error={true} (вместо true мы передаем значение нашей переменной, преобразованное с помощью !! в булево значение по правилам псевдоистины и псевдолжи):
                 Результат: красная граница появляется, когда есть у нас в локальном стейте ошибка:
                 3) Давайте текст ошибки сделаем не отдельной div с текстом ошибки, а передав условный placeholder внутрь TextArea helperText. Если текста ошибки нет - будет пустота.
                 Также добавим условный placeholder “Title”:
                 */}

            {/* />*/}
            {/*А что если все равно что-то “не то” и не хочется сильно углубляться в библиотеку? Тогда можно при необходимости через style. К примеру:
               <Button style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}/>
                  Так вы можете не только размер задать, но и цвет и т.д.
                  можем вынести в отдельный объект со стилями вот так:
                  <Button style={styleButton} onClick={addTask} color={"primary"} variant={"contained"}>+</Button>
                    */}

            {/*      <IconButton onClick={addTask} color={"primary"}>
                <AddBoxIcon/>
            </IconButton>*/}

            <Button style={styleButton} color={"primary"} variant={"contained"} onClick={addTask}>
                +
            </Button>
            {/*{error && <div className="error-message">{error}</div>}*/} {/*Эту запись error просто удаляем тогда, тот самый текст, что выскакивает у нас снизу*/}
        </div>
    );
};
