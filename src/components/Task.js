import React, { useState } from "react";


const Task= (prop) => {

    // const [task, setTask] = useState("");


    // const handleAddTodo = (e) => {

    //     e.preventDefault();

    //     //👇🏻 Logs the task to the console

    //     console.log({ task });

    //     setTask("");

    // };

    return (

        <div key={prop.task._id} className={`${prop.task.title}__items`}>

            <label htmlFor='task'>{prop.task.task}</label>
            
            {/* <input

                type='text'

                name='task'

                id='task'

                // value={task}

                className='input'

                required

                // onChange={(e) => setTask(e.target.value)}

            />

            <button className='addTodoBtn'>ADD TODO</button> */}

        </div>

    );

};


export default Task;