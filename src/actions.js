// Creamos y centralizamos los objetos que describen las acciones que se puede realizar en la app.

import { createAction } from "../framework.js";
import { NEW, IN_PROGRESS, DONE } from "./constanst.js";

export const CREATE_TASK = createAction('CREATE_TASK');
export const MOVE_TASK = createAction('MOVE_TASK');
export const DELETE_TASK = createAction('DELETE _TASK');
