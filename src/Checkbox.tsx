import Checkbox from '@mui/material/Checkbox';
import React, {ChangeEvent} from 'react';

type CheckboxType = {
    isDone: boolean;
    callback: (isDone: boolean)=>void;
}



export const SuperCheckbox = (props: CheckboxType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>{
        props.callback(e.currentTarget.checked)
    }

    return (
        <Checkbox
            checked={props.isDone}
            color="primary"
            onChange={onChangeHandler}
        />
    )
}
