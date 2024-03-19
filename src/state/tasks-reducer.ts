import {useReducer} from "react";
import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type secondACType = {
    type: 'yyy'
}

type ActionsType = RemoveTaskACType | secondACType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .filter(t=>t.id != action.taskId)
            }
        }
        // Конструкция `switch` в JavaScript представляет собой способ выбора действий в зависимости от значения выражения `action.type`.
        // В данном случае, она отслеживает тип действия (`action.type`), и для каждого типа действия выполняется определенный блок кода.
        // Рассмотрим построчно, что происходит в представленном коде:
        // 1. `switch (action.type) {`: Начало блока `switch`, в котором мы анализируем значение `action.type`.
        // 2. `case "REMOVE-TASK": {`: Здесь мы определяем, что произойдет, если `action.type` равен `"REMOVE-TASK"`. Далее следуют блоки кода, связанные с этим значением.
        // 3. `return { ...state, ... }`: Мы используем оператор spread (`...`) для создания копии текущего состояния `state`. Это делается для того, чтобы сохранить неизменным оригинальное состояние.
        // 4. `[action.todolistId]: state[action.todolistId].filter(t=>t.id != action.taskId)`: Мы обращаемся к свойству `todolistId` в объекте `state` и фильтруем его содержимое на основе предиката через функцию `filter`. Массив `state[action.todolistId]` фильтруется, чтобы исключить задачу, чей `id` соответствует `action.taskId`.
        // 5. `}`: Конец блока кода связанного с `case "REMOVE-TASK"`.
        // В итоге, если `action.type` равен `"REMOVE-TASK"`, то происходит удаление задачи из массива задач `state[action.todolistId]` в объекте `state` и возвращается обновленное состояние.
        case "yyy": {
            return {...state}
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return { type: 'REMOVE-TASK', taskId, todolistId } as const
}

export const secondACType = (): secondACType => {
    return { type: 'yyy'}
}