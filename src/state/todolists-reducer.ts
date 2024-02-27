import {useReducer} from "react";
import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: TodolistType[], action: todolistsReducer): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el=>el.id !== action.payload.id)
        }
        case "ADD-TODOLIST": {
            let newTodolist: TodolistType = {id: v1(), title: action.payload.title, filter: 'all'};
            return [...state, newTodolist]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl=>tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            // let todolist = todolists.find(tl => tl.id === todolistId);
            // if (todolist) {
            //     todolist.filter = value;
            //     setTodolists([...todolists])
            // }
            return state.map(el=>el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        }
        default: return state
    }
}


type todolistsReducer = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType | ChangeFilterACType


type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const
}


type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title
        }
    } as const
}


type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id,
            title
        }
    } as const
}


type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (value: FilterValuesType, todolistId: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            filter: value,
            id: todolistId
        }
    } as const
}