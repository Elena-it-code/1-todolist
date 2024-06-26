import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistWithRedux} from "./TodolistWithRedux";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {
    console.log("App is called")
    // Для того чтобы внутри компоненты AppWithRedux достучаться до данных из redux, будем использовать специальный
    // hook из библиотеки react-redux - useSelector
    // useSelector - это функция, которая селектит\выбирает что-то из чего-то… В нашем случае из state-а данные для
    // конкретного компонента. И вместо двух разных диспатчей мы будем использовать один dispatch
    let todolists = useSelector<AppRootStateType,TodolistType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const removeTask = useCallback(function (id: string, todolistId: string)  {
        let action = removeTaskAC(id, todolistId) // создаем action с помощью AC
        dispatch(action) // отправляем в редьюсер
    },[dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    },[dispatch])

    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string)=> {
        dispatch(changeTaskStatusAC(id, isDone, todolistId))
    },[dispatch])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string)=> {
        dispatch(changeTaskTitleAC(id,newTitle, todolistId))
    },[dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string)=> {
        dispatch(changeFilterAC(value, todolistId))
    },[dispatch])

    const removeTodolist = useCallback((id: string)=> {
        let action = removeTodolistAC(id)
        dispatch(action)
    },[dispatch])

    const changeTodolistTitle = useCallback((id: string, title: string)=> {
        dispatch(changeTodolistTitleAC(id, title))
    },[dispatch])

    const addTodolist = useCallback( (title: string) => {
        // То есть мы засунули нашу функцию в useCallback, и React нам будет формировать и возвращать из этого
        // useCallback всякий раз один и тот же объект и у нас лишние перерисовки уйдут.
        let action = addTodolistAC(title) // создаем action с помощью AC
        dispatch(action) // отправляем в редьюсер
    }, [dispatch])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            // if (tl.filter === "active") {
                            //     tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            // }
                            // if (tl.filter === "completed") {
                            //     tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            // }

                            return <Grid key={tl.id} item>
                                <Paper style={{padding: "10px"}}>
                                    {/*<TodolistWithRedux // отрисовываем вместо <Todolist/>
                                        id={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                    />*/}
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
