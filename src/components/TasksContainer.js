import React, { useState, useEffect } from "react"
import "../App.css"
import APIHelper from "../Api.js"
import Task from "./Task"

function TasksContainer() {
  const [tasks, setTodos] = useState([])
  const [task, setTodo] = useState("")
  const [boards, setBoards] = useState([])

  useEffect(() => {
    const fetchTodoAndSetTodos = async () => {
      const todos = await APIHelper.getAllTodos()
      const list = [[],[],[]]
      todos.forEach(todo => {
      list[todo.index].push(todo) 
      });
      console.log(list)
      setTodos(todos)
    }
    fetchTodoAndSetTodos()
  }, [])

  useEffect(() => {
    const fetchBoardsAndSetBoards = async () => {
      const boards = await APIHelper.getAllBoards()
      setBoards(boards)
    }
    fetchBoardsAndSetBoards()
  }, [])

  const createTodo = async e => {
    e.preventDefault()
    if (!task) {
      alert("please enter something")
      return
    }
    if (tasks.some(({ task }) => task === task)) {
      alert(`Task: ${task} already exists`)
      return
    }
    const newTodo = await APIHelper.createTodo(task)
    setTodos([...tasks, newTodo])
  }

  const deleteTodo = async (e, id) => {
    try {
      e.stopPropagation()
      await APIHelper.deleteTodo(id)
      setTodos(tasks.filter(({ _id: i }) => id !== i))
    } catch (err) { }
  }
  const updateTodo = async (e, id, board) => {
    console.log(board)
    e.stopPropagation()
    const payload = {
      index: ++tasks.find(todo => todo._id === id).index,
      title: board
    }
    const updatedTodo = await APIHelper.updateTodo(id, payload)
    setTodos(tasks.map(todo => (todo._id === id ? updatedTodo : todo)))
    
  }

  return (
    <div className="container">
      {/* <div>
        <input
          id="todo-input"
          type="text"
          value={todo}
          onChange={({ target }) => setTodo(target.value)}
        />
        <button type="button" onClick={createTodo}>
          Add
        </button>
      </div> */}
      {boards.map((board) => (
        <div
          key={board.index}
          // onClick={e => updateTodo(e, _id)}
          className={`${board.title.toLowerCase()}__wrapper`}

        >
          <h3>{board.title}</h3>
          <div
            className={`${board.title.toLowerCase()}__container`}

          >
            {tasks.map((task) => (
              task.index === board.index
                ? (<div key={task._id} task={task} className={`${task.title}__items`}>


                 

                    <h3 >{task.task}</h3>
                    <p>{task.username}</p>


                    <button type="button" onClick={e => updateTodo(e, task._id, boards[board.index+1 ].title.toLowerCase())}  >Hepp</button>




                </div>)
                : null
            )
            )}


          </div>
        </div>
      ))}


    </div>
  )
}


export default TasksContainer;