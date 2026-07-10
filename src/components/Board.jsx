import { createElement } from "../../framework.js";
import { NEW, IN_PROGRESS, DONE } from "../constanst.js";
import { Column } from './Column.jsx'

export const Board = ({ tasks }) => {
    return (
        <div className="board">
            <Column title="Nuevos" tasks={tasks.filter(t => t.status === NEW)} />
            <Column title="En Desarrollo" tasks={tasks.filter(t => t.status === IN_PROGRESS)} />
            <Column title="Realizados" tasks={tasks.filter(t => t.status === DONE)} />
        </div>
    );
};