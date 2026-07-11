import { createElement } from "../../framework.js";
import { NEW, IN_PROGRESS, DONE } from "../constanst.js";
import { Column } from './Column.jsx'

export const Board = ({ tasks, onMoveTask, onDeleteTask }) => {
    return (
        <div className="board">
            <Column title="Nuevos" tasks={tasks.filter(t => t.status === NEW)} onMoveTask = {onMoveTask} onDeleteTask = {onDeleteTask} />
            <Column title="En Desarrollo" tasks={tasks.filter(t => t.status === IN_PROGRESS)} onMoveTask = {onMoveTask} onDeleteTask = {onDeleteTask} />
            <Column title="Realizados" tasks={tasks.filter(t => t.status === DONE)}  onMoveTask = {onMoveTask} onDeleteTask = {onDeleteTask} />
        </div>
    );
};