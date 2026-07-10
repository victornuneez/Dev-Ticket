import { createStore } from "../framework.js";
import { taskReducer } from "./reducer.js";


const initialState = {
    tasks: [],
    developers: ['Laura', 'Carlos', 'Victor']
};

export const store = createStore(taskReducer, initialState);