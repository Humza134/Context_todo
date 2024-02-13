import { createContext,useContext } from "react";

interface Todo {
    id: number;
    todo: string;
    completed: boolean;
}

export const TodoContext = createContext({
    todos: [
        {
            id : 1,
            todo : "Todo msg",
            completed : false,
        }
    ],
    addTodo : (todo:Todo ) => {},
    updateTodo : (id:number, todo:string) => {},
    deleteTodo : (id:number) => {},
    toggleComplete : (id:number) => {}
})

export const useTodo = () => {
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider