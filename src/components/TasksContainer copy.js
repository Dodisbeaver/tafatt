import React from "react";

import { Link } from "react-router-dom";


const TasksContainer = ({ socket }) => {

    return (

        <div className='container'>

            <div className='pending__wrapper'>

                <h3>Adventure</h3>

                <div className='pending__container'>

                    <div className='pending__items'>
                        <h3>Ninja Kitten</h3>
                        <p>Take out the trash</p>

                        <p className='comment'>

                            <Link to='/comments'>2 Comments</Link>

                        </p>

                    </div>
                    <div className='pending__items'>
                        <h3>Stomp Mother</h3>
                        <p>Buy groceries</p>

                        <p className='comment'>

                            <Link to='/comments'>0 Comments</Link>

                        </p>

                    </div>

                </div>

            </div>


            <div className='ongoing__wrapper'>

                <h3>Quests</h3>

                <div className='ongoing__container'>

                    <div className='ongoing__items'>
                        <h3>Dragon slayer</h3>
                        <p>Do homework</p>

                        <p className='comment'>

                            <Link to='/comments'>Add Comment</Link>

                        </p>

                    </div>

                </div>

            </div>


            <div className='completed__wrapper'>

                <h3>Completed Quests</h3>

                <div className='completed__container'>

                    <div className='completed__items'>
                        <h3>Ninja Kitten</h3>
                        <p>Do homework</p>

                        <p className='comment'>

                            <Link to='/comments'>2 Comments</Link>
                        
                        </p>
                        <Link to='/comments'>Reveal reward</Link>
                    </div>

                </div>

            </div>

        </div>

    );

};


export default TasksContainer;