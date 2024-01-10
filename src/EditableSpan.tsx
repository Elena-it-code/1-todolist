import React from 'react';

type PropsType = {
    title: string
}

export const EditableSpan = (props: PropsType) => {
    return (
            <span>{props.title}</span>
    );
};

