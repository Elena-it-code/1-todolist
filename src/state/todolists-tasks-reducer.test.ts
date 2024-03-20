import {TasksStateType, TodolistType} from "../App";
import {addTodolistAC, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistType> = []

    const action = addTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolistId)
    expect(idFromTodolists).toBe(action.payload.todolistId)
})


//Разберем этот тест построчно:
//
// 1. `const startTasksState: TasksStateType = {}`
// - Здесь создается начальное состояние для списка задач.
// 2. `const startTodolistsState: Array<TodolistType> = []`
// - Здесь создается начальное состояние для массива списков дел.
// 3. Создается действие `const action = addTodolistAC('new todolist')`, в котором вызывается функция `addTodolistAC` для создания нового списка дел с именем 'new todolist'.
// 4. Теперь это действие применяется к reducers:
// - `const endTasksState = tasksReducer(startTasksState, action)` - Применяет действие к редуктору задач.
// - `const endTodolistsState = todolistsReducer(startTodolistsState, action)` - Применяет действие к редуктору списков дел.
// 5. `const keys = Object.keys(endTasksState)`
// - Получает все ключи из результирующего состояния задач.
// 6. `const idFromTasks = keys[0]`
// - Получает идентификатор первой задачи из списка задач.
// 7. `const idFromTodolists = endTodolistsState[0].id`
// - Получает идентификатор первого списка дел из результирующего состояния списков дел.
// 8. `expect(idFromTasks).toBe(action.payload.todolistId)`
// - Проводится проверка, что полученный идентификатор первой задачи соответствует идентификатору из пейлоада (данных) действия.
// 9. `expect(idFromTodolists).toBe(action.payload.todolistId)`
// - Проводится проверка, что полученный идентификатор первого списка дел соответствует идентификатору из пейлоада (данных) действия.
//
// Таким образом, данный тест выполняет проверку корректности возвращаемых идентификаторов для задач и списков дел после применения действия добавления нового списка дел.