import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {action} from '@storybook/addon-actions'

import {Button} from './Button';
import {AddItemForm, AddItemFormPropsType} from "../AddItemForm";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import {EditableSpan} from "../EditableSpan";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: { // это объект в котором мы можем что-то показать и рассказать. Предназначен для ограничений изменений наших props(ов) и для описания, если они заданы не явно
        onChange: {
            description: 'Clicked change span',
            action: 'clicked'
    },
    value: {
        description: 'Span value',
    }
    },
    args: {
        value: 'HTML'
    }
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const EditableSpanStory: Story = {
    /*args: { // можем и тут указать значение по default, чтобы увидеть наш EditableSpan, либо вверху указать, как мы и сдедали в стр.32-34
        value: 'HTML'
    }*/
};



