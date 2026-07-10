import  { createElement } from '../../framework.js';

export const TaskCard = ({ task }) => {
    return ( 
        <div className='task-card'>
            <h3>{task.title}</h3>
            <p>Dev: {task.developer}</p>
        </div>
    );
};