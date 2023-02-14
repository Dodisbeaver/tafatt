import React, { useState, useEffect } from "react";
import APIHelper from "../Api.js"

const Task= (prop) => {
   const [tasks, setTodos] = useState([])

 
 

    return (

        <div  className={`${prop.task.title}__items`}>

            <h3 >{prop.task.task}</h3>
            <p>{prop.task.username}</p>

           
            <button type="button"    >Hepp</button>
          
    
        </div>

    );

};


export default Task;