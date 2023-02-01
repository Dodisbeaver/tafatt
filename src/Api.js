import axios from "axios"

const API_URL = "http://localhost:4000"

async function createTodo(task) {
  const { data: newTodo } = await axios.post(API_URL+'/tasks', {
    task,
  })
  return newTodo
}

async function deleteTodo(id) {
  const message = await axios.delete(`${API_URL+'/tasks'}${id}`)
  return message
}

async function updateTodo(id, payload) {
  const { data: newTodo } = await axios.patch(`${API_URL+'/tasks/'}${id}`, payload)
  return newTodo
}

async function getAllTodos() {
  const { data: todos } = await axios.get(API_URL+'/tasks')
  return todos
}
async function getAllBoards() {
    const { data: boards } = await axios.get(API_URL+'/boards')
    return boards
  }

export default { createTodo, deleteTodo, updateTodo, getAllTodos,getAllBoards }