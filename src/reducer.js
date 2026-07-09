// Este archivo contiene la funcion principal que ejecuta las acciones de app y devuelve el estado actualizado.

import { CREATE_TASK, MOVE_TASK, DELETE_TASK } from "./actions.js";

export const taskReducer = (state, action) => {
    if(action.type === CREATE_TASK.type) {
        return {
            ...state,
            tasks: [...state.tasks, action.payload]
        };
    }

    if(action.type === MOVE_TASK.type) {
        return {
            ...state,
            tasks: state.tasks.map(task => {
                if(task.id === action.payload.id) { // copiamos los campos de la tarea y devolvemos la tarea con el estado actualizado.
                    return {
                        ...task,
                        status: action.payload.newStatus
                    };
                }
                return task;
            })
        };
    }

    if(action.type === DELETE_TASK.type) {
        return {
            ...state,
            tasks: state.tasks.filter(task => task.id !== action.payload)
        };
    }
    return state; // Si llega una accion que no conoce el reducer devuelve el estado sin cambios.

};