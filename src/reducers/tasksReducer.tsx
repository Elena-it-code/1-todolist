import {TaskType} from "../Todolist";

export const tasksReducer = (state: TaskType[], action: TsarType) => { // принимает два параметра (state: TaskType[] - state с которым он будет работать и action: TsarType - данные для работы)
    switch (action.type) {
        case 'REMOVE-TASK': {
            let filteredTasks = state.filter(t => t.id != action.payload.id);
        /*setTasks(filteredTasks);*/
            return state
        }
        default:
            return state
    }
}

type TsarType = RemoveTaskACType // создали общий тип, чтобы потом через | указывать др. типы н/р: ___ type TsarType = RemoveTaskACType | RemoveTodolistACType | AddTaskACType | и т.д.
type RemoveTaskACType = ReturnType<typeof removeTaskAC> // для функций AC, в названии добавляем в конце AC
export const removeTaskAC = (id: string) => {
    return {
        type: 'REMOVE-TASK', // чтобы он не читал это как string у объекта, а принимал как const , поэтому мы и написали as const, принимай как constant(у)
        payload: { // специальный объект для хранения всех, приходящих параметров в f AC ()
            id, // равносильно записи id : id, поскольку свойство и значение совпадают
        }
    } as const // !!! ВСЕГДА ПРИВОДИМ К CONSTANTE иначе всегда будет строка string,  и приложение наше будет падать!!! as const - для того, чтобы он понимал для чего swith case ''
}