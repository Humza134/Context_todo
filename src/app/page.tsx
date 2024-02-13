'use client'
import { useState,useEffect } from "react"
import { TodoProvider } from "./Contexts"
import { TodoForm, TodoItem } from "./Components"

export default function Home() {
  const [todos, setTodos] = useState<any[]>([])

  const addTodo = (todo: any) => {
    setTodos((prev) => [{id:Date.now(), ...todo}, ...prev])
  }

  const updateTodo = (id:number, todo:string) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id:number) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id)) 
  }

  const toggleComplete = (id:number) => {
    setTodos((prev) => prev.map((prevTodo) =>prevTodo.id === 
    id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo))
  }

  useEffect(() => {
    const storedTodosString = localStorage.getItem("todos");
    if (storedTodosString) {
      const storedTodos = JSON.parse(storedTodosString);
      if (Array.isArray(storedTodos) && storedTodos.length > 0) {
        setTodos(storedTodos);
      }
    }
  }, []);
  

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  },[todos])


  return (
   <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
    <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
            <div className="mb-4">
                {/* Todo form goes here */} 

              <TodoForm/>

            </div>
            <div className="flex flex-wrap gap-y-3">
                {/*Loop and Add TodoItem here */}

                {todos.map((todo)=>(
                  <div key={todo.id} className="w-full">
                    <TodoItem todo={todo}/>
                  </div>
                ))}

            </div>
        </div>
      </div>
   </TodoProvider>
  )
}
