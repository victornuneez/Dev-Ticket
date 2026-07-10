import { createElement, update } from "../framework.js";
import { App } from './App.jsx';
import { store } from "./store.js";

const root = document.getElementById('root');

const render = () => {
    update(root, <App />);
}

store.subscribe(render);
render();