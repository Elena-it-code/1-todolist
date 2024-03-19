import {useReducer} from "react";
import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type addTaskACType = ReturnType<typeof addTaskAC>

type ActionsType = RemoveTaskACType | addTaskACType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .filter(t => t.id != action.taskId)
            }
        }
        //ЧТО ПРОИСХОДИТ В ДАННОМ КОДЕ:
        // Конструкция `switch` в JavaScript представляет собой способ выбора действий в зависимости от значения выражения `action.type`.
        // В данном случае, она отслеживает тип действия (`action.type`), и для каждого типа действия выполняется определенный блок кода.
        // Рассмотрим построчно, что происходит в представленном коде:
        // 1. `switch (action.type) {`: Начало блока `switch`, в котором мы анализируем значение `action.type`.
        // 2. `case "REMOVE-TASK": {`: Здесь мы определяем, что произойдет, если `action.type` равен `"REMOVE-TASK"`. Далее следуют блоки кода, связанные с этим значением.
        // 3. `return { ...state, ... }`: Мы используем оператор spread (`...`) для создания копии текущего состояния `state`. Это делается для того, чтобы сохранить неизменным оригинальное состояние.
        // 4. `[action.todolistId]: state[action.todolistId].filter(t=>t.id != action.taskId)`: Мы обращаемся к свойству `todolistId` в объекте `state` и фильтруем его содержимое на основе предиката через функцию `filter`. Массив `state[action.todolistId]` фильтруется, чтобы исключить задачу, чей `id` соответствует `action.taskId`.
        // 5. `}`: Конец блока кода связанного с `case "REMOVE-TASK"`.
        // В итоге, если `action.type` равен `"REMOVE-TASK"`, то происходит удаление задачи из массива задач `state[action.todolistId]` в объекте `state` и возвращается обновленное состояние.
        case "ADD-TASK": {
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        }
        //1.ОДИН ИЗ ВАРИАНТОВ написания этой же логики:
        // let newTask = {id: v1(), title: action.title, isDone: false}; // Создаем новую задачу с уникальным идентификатором и начальным состоянием
        // return {
        //     ...state,
        //     [action.todolistId]: [newTask, ...state[action.todolistId]] // Возвращаем обновленное состояние со вставленной новой задачей
        // }
        // 2.УПРОЩЕННАЯ ЗАПИСЬ написания этой же логики:
        //let newTask = { id: v1(), title: 'juse', isDone: false }; // Создаем новую задачу с уникальным идентификатором и начальным состоянием
        //let updatedTasks = [...state[action.todolistId], newTask]; // Формируем обновленный массив задач, добавляя в него новую задачу
        //return {
        //   ...state,
        //   [action.todolistId]: updatedTasks // Возвращаем обновленное состояние со вставленной новой задачей
        //};
        //}
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
