import { createElement } from "../../framework.js";
import { TaskCard } from "./TaskCard.jsx";

export const Column = ({ title, tasks, onMoveTask, onDeleteTask }) => {
    return (
        <div className="column">
            <h2>{title}</h2>
            <div className="task-list">
                { tasks.map(task => (
                    <TaskCard 
                    key={task.id} 
                    task={task} 
                    onMoveTask = {onMoveTask}
                    onDeleteTask = {onDeleteTask}
                    />
                ))}
            </div>
        </div>
    );
}