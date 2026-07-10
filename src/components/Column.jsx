import { createElement } from "../../framework.js";
import { TaskCard } from "./TaskCard.jsx";

export const Column = ({ title, tasks }) => {
    return (
        <div className="column">
            <h2>{title}</h2>
            <div className="task-list">
                { tasks.map(task => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
}