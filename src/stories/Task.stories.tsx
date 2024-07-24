import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import {action} from '@storybook/addon-actions'

import { Button } from './Button';
import {AddItemForm, AddItemFormPropsType} from "../AddItemForm";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import {Task} from "../Task";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Task> = {
  title: 'TODOLISTS/Task',
  component: Task,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: { // описали наши callback(и), те, что в props в нашей компоненте Task
    changeTaskStatus: {
      action: 'clicked' // ранее в версиях надо было создавать callback/action, чтобы показать какое-то действие. А в новой версии можем делать это сразу тут
    },
    changeTaskTitle: {
      action: 'clicked' // ранее в версиях надо было создавать callback/action, чтобы показать какое-то действие. А в новой версии можем делать это сразу тут
    },
    removeTask: {
      action: 'clicked'
    }
  },
  args: {
    tasks: {id: '1', isDone: true, title: "CSS Book"},
    todolistId: '123456789wer',
  }
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TaskIsDoneStory: Story = { // создали историю для выполненной таски
  args: {
    // changeTaskStatus: action('changeTaskStatus'),
    // changeTaskTitle: action('changeTaskTitle'),
    // removeTask: action('removeTask'),
    // tasks: {id: '1', isDone: true, title: "CSS Book"},
    // todolistId: '123456789wer',
  }
};


export const TaskIsNotDoneStory: Story = { // создали историю для НЕ выполненной таски
  args: {
    // changeTaskStatus: action('changeTaskStatus'),
    // changeTaskTitle: action('changeTaskTitle'),
    // removeTask: action('removeTask'),
    tasks: {id: '2', isDone: false, title: "JavaScript Book"},
    // todolistId: '123456790wer',
  }
};


const TaskWork = () => {
  const [task, setTask]=useState({id: '2', isDone: false, title: "JavaScript Book"})

  function changeTaskStatus (id: string, isDone: boolean) {
    setTask({...task, isDone: isDone})
  }

  function changeTaskTitle (taskId: string, title: string) {
    setTask({...task, title: title})
  }

  return <Task tasks={task}
               changeTaskTitle={changeTaskTitle}
               changeTaskStatus={changeTaskStatus}
               removeTask={action('removeTask')}
               todolistId={'123456789wer'}
               filter={"active"}
  />
}

export const TaskWorkStory: Story = {
  render: ()=> <TaskWork />
}



