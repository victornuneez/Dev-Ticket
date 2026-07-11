import { createElement } from "../../framework.js";

// Componente del formulario para crear tareas.
export const TaskForm = ({ developers, onCreateTask }) => {
    return (
        <div>
            <input id="title" type="text" placeholder="Titulo de la tarea" />
            
            <select id="developersSelect">
                {developers.map(dev => (
                    <option value={dev}>{dev}</option>
                ))}
            </select>
            
            <button onClick={() => {
                const title = document.getElementById('title').value;
                const dev = document.getElementById('developersSelect').value;
                onCreateTask(title, dev)
                document.getElementById('title').value = '';
            }}>
                Crear Tarea
            </button>
        </div>
    );
};