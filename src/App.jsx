// Su responsabilidad es devolver la estructura principal de la pagina.
// Sin un contenedor principal, no se tiene donde montar los componentes hijos.
import { createElement } from '../framework.js';
import { store } from './store.js'
import { CREATE_TASK, MOVE_TASK, DELETE_TASK } from './actions.js';
import { TaskForm } from './components/TaskForm.jsx';
import { NEW } from './constanst.js';
import { Board } from './components/Board.jsx';

export const App = (props) => {

    const handleCreateTask = (title, dev) => {
        const newTask = { id: Date.now(), title, developer: dev, status: NEW };
        store.dispatch(CREATE_TASK(newTask));
    };

    const handleMoveTask = (id, newStatus) => {
        store.dispatch(MOVE_TASK({ id, newStatus }));
    };

    const handleDeleteTask = (id) => {
        store.dispatch(DELETE_TASK(id));
    };


    return (
        <div id="app">
            <h1>Ticket-Dev</h1>
            
            <TaskForm 
                developers={store.getState().developers}
                onCreateTask={handleCreateTask}
            />

            <Board 
            tasks={store.getState().tasks} 
            onMoveTask = {handleMoveTask}
            onDeleteTask = {handleDeleteTask}
            />
        </div>
    );
};