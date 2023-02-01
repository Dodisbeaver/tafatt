import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Tasks from "./Tasks";


// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}-${new Date().getTime()}`,
        content: `item ${k + offset}`
    }));



const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
}

const TasksContainer = ({ socket }) => {
    // const [tasks, setTasks] = useState({});
    const [tasks, setTasks] = useState({});

    useEffect(() => {
        function fetchTasks() {
            fetch("http://localhost:4000/boards")
                .then((res) => res.json())
                .then((data) => setTasks(data));
        }
        fetchTasks();
    }, []);

    useEffect(() => {
        socket.on("tasks", (data) => {

            setTasks(data);
        });
    }, [socket]);
    // console.log(Object.values(tasks))
    /**
 * Moves an item from one list to another list.
 */
    const move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };



    // const [tasks, setTasks] = useState([getItems(10), getItems(5, 10)]);


    //handles dragginng to dropping 
    const handleDragEnd = ({ destination, source }) => {

        // dropped outside the list
        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            const items = reorder(tasks[sInd], source.index, destination.index);
            const newState = [...tasks];
            newState[sInd] = items;
            setTasks(newState);
        } else {
            const result = move(tasks[sInd], tasks[dInd], source, destination);
            const newState = [...tasks];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];

            setTasks(newState.filter(group => group.length));
        }
		// if (!destination) return;
		// if (
		// 	destination.index === source.index &&
		// 	destination.droppableId === source.droppableId
		// )
		// 	return;

	
        socket.emit("taskDragged", {
            source,
            destination,
        });


    };

    const taskArr = Object.values(tasks)
    console.log(tasks)
    return (

        <div className='container'>
            <div>
                <button
                    type="button"
                // onClick={() => {
                //   setState([...state, []]);
                // }}
                >
                    Add new group
                </button>
                <button
                // type="button"
                // onClick={() => {
                //   setState([...state, getItems(1)]);
                // }}
                >
                    Add new item
                </button>
            </div>
            <DragDropContext onDragEnd={handleDragEnd}>
                {Object.entries(tasks).map((task, ind) => (
                    
                    <div
                        className={`${task[1].title.toLowerCase()}__wrapper`}
                        key={ind.toString()}
                        >
                        <h3>{task[1].title} Tasks</h3>
                        
                   <Tasks socket = {socket} ondragEnd = {handleDragEnd}/>
                        {/* <Droppable key={ind.toString()} droppableId={task[1]._id}>

                            {(provided, snapshot) => (
                                
                                <div
                                    className={`${task[1].title.toLowerCase()}__container`}
                                    ref={provided.innerRef}
                                    key={ind.toString()}
                                >
                                  
                                    {task.map((item, index) => (
                                        
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`${task[1].title.toLowerCase()}__items`}

                                                >
                                                    <div>                                                  
                                                        <h3>{item.username}</h3>
                                                        <p>{item.task}</p>
                                         
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable> */}
                    </div>
                ))}
            </DragDropContext>
    
        </div>
    );
};


export default TasksContainer;
