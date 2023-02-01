import React, { useState, useEffect } from "react";
import APIHelper from "../Api.js"

const Task= (prop) => {
   const [tasks, setTodos] = useState([])

 
      useEffect(() => {
        const fetchTodoAndSetTodos = async () => {
          const todos = await APIHelper.getAllTodos()
          setTodos(todos)
        }
        fetchTodoAndSetTodos()
      }, [])

    return (

        <div  className={`${prop.task.title}__items`}>

            <h3 >{prop.task.task}</h3>
            <p>{prop.task.username}</p>

           
            <button type="button"  onClick={e => updateTodo(e, prop.task._id)}  >Hepp</button>
          
    
        </div>

    );

};


export default Task;