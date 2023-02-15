import React, { useState } from "react";
import "../App.css"
import APIHelper from "../Api.js"

const AddTask = ({ socket }) => {

    const [task, setTodo] = useState("");
    const [username, setUser] = useState("");


    const handleAddTodo = (e) => {

        e.preventDefault();

        //👇🏻 Logs the task to the console

        console.log({ task });

        setTodo("");

    };

    const createTodo = async e => {
        e.preventDefault()
       
        if (!task) {
          alert("please enter something")
          return
        }
        if (!username) {
            alert("please enter something")
            return
          }
        // if (task.some(({ task }) => task === task)) {
        //   alert(`Task: ${task} already exists`)
        //   return
        // }
        const newTodo = await APIHelper.createTodo(task,username)
        setTodo("")
        setUser("")
        window.location.reload(false);
      }

    return (

        <form className='form__input' onSubmit={createTodo}>


            <label htmlFor='task'>Add Todo
                <input

                    type='text'

                    name='task'

                    id='task'

                    value={task}

                    className='input'

                    required

                    onChange={(e) => setTodo(e.target.value)}

                />
            </label>
            <label htmlFor="username">For who?
                <input type='text' name="username" id='username' value={username} className="input" required onChange={(e) => setUser(e.target.value)} />
            </label>


            <button className='addTodoBtn'>ADD TODO</button>

        </form>

    );

};


export default AddTask;