// Su responsabilidad es devolver la estructura principal de la pagina.
// Sin un contenedor principal, no se tiene donde montar los componentes hijos.
import { createElement } from '../framework.js';
import { store } from './store.js'
import { CREATE_TASK } from './actions.js';
import { TaskForm } from './components/TaskForm.jsx';
import { NEW } from './constanst.js';
import { Board } from './components/Board.jsx';

export const App = (props) => {

    const handleCreateTask = (title, dev) => {
        const newTask = { id: Date.now(), title, developer: dev, status: NEW };
        store.dispatch(CREATE_TASK(newTask));
    };


    return (
        <div id="app">
            <h1>Ticket-Dev</h1>
            
            <TaskForm 
                developers={store.getState().developers}
                onCreateTask={handleCreateTask}
            />

            <Board tasks={store.getState().tasks} />
        </div>
    );
};