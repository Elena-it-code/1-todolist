type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const userReducer = (state: StateType, action: ActionType):StateType => { /*всегда типизируем на выходе, :StateType, какой state пришел такой же и должны вернуть, той же структуры, чтобы не ошибиться при перезатирании свойств у наших объектов*/
    switch (action.type) {
        case 'INCREMENT-AGE':
            return {...state, age: state.age + 1}      // иммутабельно, не трогая оригинальный стейт, сделали копию!
        case 'INCREMENT-CHILDREN-COUNT':
            return {...state, childrenCount: state.childrenCount + 1}      // иммутабельно, не трогая оригинальный стейт, сделали копию!
        default:
            throw new Error('I don\'t understand this type')
    }
}

