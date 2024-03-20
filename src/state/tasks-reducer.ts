import {useReducer} from "react";
import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./todolists-reducer";

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodolistACType
    | RemoveTodolistACType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {

        case "REMOVE-TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .filter(t => t.id != action.taskId)
            }
        }

        case "ADD-TASK": {
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        }

        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(el => el.id === action.taskId ? {...el, isDone: action.isDone} : el)
            }
        }

        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(el => el.id === action.taskId ? {...el, title: action.title} : el)
            }
        }

        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        }

        case "REMOVE-TODOLIST": {
            // case "REMOVE-TODOLIST": {
            //     let copyState = {...state}
            //             delete copyState[action.payload.id]
            //             return copyState
            // }
            const {[action.payload.id]: [], ...rest} = state
            return rest
        }

        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId, todolistId} as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', title, todolistId} as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId} as const
}




//--------------------------------------------------------------------------------------------------------------------//
//case "REMOVE-TODOLIST": {
    // этот case отвечает за удаление объекта, ключ которого лежит в actionCreater по ключю, по id Todolist
    // Для удаления всех задач из состояния при удалении списка дел в Redux,
    // нам нужно вернуть обновленное состояние, где свойство с идентификатором удаленного списка дел будет пустым массивом.
    // ЛОГИКА ДЛЯ ЭТОГО:
    // javascript
    // case "REMOVE-TODOLIST": {
    //     let copyState = {...state}
    //             delete copyState[action.payload.id]
    //             return copyState
    // }
    // Мы создаем копию текущего состояния в переменной `copyState` с помощью оператора spread (`...state`).
    // После этого мы удаляем свойство с идентификатором удаленного списка дел, используя оператор `delete`.
    // Затем мы возвращаем обновленное состояние без свойства удаленного списка дел.
    // Таким образом, при срабатывании действия REMOVE-TODOLIST все задачи/task(и), связанные с удаленным списком дел,
    // будут также удалены из состояния.


    /*const {[action.payload.id]: [], ...rest} = state
    return rest*/
    //Конструкция const {[action.payload.id]: [], ...rest} = state и return rest представляют собой применение
    // деструктуризации и оператора spread для удаления определенного свойства из объекта состояния.
    //
    // Разберем этот код построчно:
    //
    // 1. `{[action.payload.id]: [], ...rest} = state`
    // - В этой строке кода используется деструктуризация объекта `state`. Мы создаем новую переменную `rest`,
    // которая содержит все остальные свойства объекта `state`, за исключением свойства с именем, указанного
    // в `action.payload.id` (это называется "вычленение" свойства из объекта).
    // - `{[action.payload.id]: []}` - Эта часть выражения отвечает за вычленение свойства с именем, указанным
    // в `action.payload.id` и присваивает ему пустой массив.
    // - `...rest` - Эта часть выражения использует оператор spread для сбора всех остальных свойств
    // объекта `state` в переменную `rest`.
    //
    // 2. `return rest`
    // - После выполнения деструктуризации и получения нового объекта cостояния без свойства с определенным
    // именем,этот объект возвращается из функции.
    //
    // Таким образом, данная конструкция удаляет свойство с определенным именем из объекта состояния и возвращает его без этого свойства.

//}