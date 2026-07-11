import  { createElement } from '../../framework.js';
import { NEW, IN_PROGRESS, DONE } from '../constanst.js';
export const TaskCard = ({ task, onMoveTask, onDeleteTask }) => {

    let actionButton; // Sirve como contenedor temporal del boton que corresponde a cada tarea segun su estado antes de renderizar.
    if(task.status === NEW) {
        actionButton = (
            <button onClick={() => onMoveTask(task.id, IN_PROGRESS)}>
                Iniciar Desarrollo
            </button>
        );
    } else if(task.status === IN_PROGRESS) {
        actionButton = (
            <button onClick={() => onMoveTask(task.id, DONE)}>
                Terminar Tarea
            </button>
        );
    } else if(task.status === DONE) {
        actionButton = (
            <button onClick={() => onDeleteTask(task.id)}>
                Eliminar
            </button>
        );
    }

    return ( 
        <div className='task-card'>
            <h3>{task.title}</h3>
            <p>Dev: {task.developer}</p>
            {actionButton}
        </div>
    );
};

// Nota: Utilizamos una variable contenedora de un boton junto con los else if para que actionButton siempre tenga un elemento a renderizar. 
// ERROR:
// Porque el framework no escapa los valores false, los incluye en el arbol virtual.
// Con esta logica evitamos que el framework cree el arbol virtual que describe la UI con un nodo de valor false.
// Esto evita que el framework se rompa cuando quiera acceder a ese nodo. 