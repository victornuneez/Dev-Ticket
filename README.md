# Dev-Ticket

Tablero Kanban para gestión de tareas de desarrollo, construido como aplicación de ejemplo usando el framework **[Apheleia](https://github.com/victornuneez/Framework--Apheleia)** (Virtual DOM + JSX + estado estilo Redux).

## Descripción

Dev-Ticket permite crear tareas, asignarlas a un desarrollador, y moverlas a través de tres columnas de estado:

**Nuevos → En Desarrollo → Realizados**

Todo el estado de la aplicación (tareas y desarrolladores) vive en un único store global, y la UI se re-renderiza automáticamente cada vez que el estado cambia.

## Características

- Crear tareas indicando título y desarrollador asignado.
- Tablero con 3 columnas según el estado de la tarea (`NEW`, `IN_PROGRESS`, `DONE`).
- Cada tarjeta de tarea muestra una acción distinta según su estado:
  - **Nuevos** → botón "Iniciar Desarrollo".
  - **En Desarrollo** → botón "Terminar Tarea".
  - **Realizados** → botón "Eliminar".
- Estado centralizado con `createStore` / `createAction` / `reducer` (patrón Redux).
- Renderizado 100% declarativo con JSX, sin manipulación manual del DOM fuera del framework.

## Requisitos

- Node.js y npm (para transpilar JSX con Babel).
- Un navegador moderno con soporte de ES Modules.

## Estructura del proyecto

```
Dev-Ticket/
├── dist/                      # Código transpilado (generado con Babel, no editar a mano)
├── node_modules/
├── src/
│   ├── components/
│   │   ├── TaskForm.jsx       # Formulario para crear una nueva tarea
│   │   ├── Board.jsx          # Contenedor de las 3 columnas, filtra tareas por estado
│   │   ├── Column.jsx         # Una columna del tablero, renderiza su lista de tareas
│   │   └── TaskCard.jsx       # Tarjeta individual de tarea con su botón de acción
│   ├── actions.js             # Action creators: CREATE_TASK, MOVE_TASK, DELETE_TASK
│   ├── App.jsx                # Componente raíz: layout, handlers de acciones
│   ├── constanst.js           # Constantes de estado: NEW, IN_PROGRESS, DONE
│   ├── main.jsx               # Punto de entrada: monta <App /> y se suscribe al store
│   ├── reducer.js             # taskReducer: lógica pura de actualización de estado
│   └── store.js               # Instancia del store (createStore + estado inicial)
├── .gitignore
├── babel.config.json
├── framework.js               # Core del framework Apheleia (VDOM, store)
├── index.html
├── package-lock.json
├── package.json
└── README.md
```

## Instalación

```bash
git clone <url-del-repositorio>
cd Dev-Ticket
npm install
```

## Uso

### 1. Transpilar el código JSX

```bash
npx babel src --out-dir dist
```

> ⚠️ **Importante:** después de transpilar, revisar manualmente los archivos generados en `dist/` (`main.js`, `App.js`, `Board.js`, `Column.js`) y corregir las rutas de importación de `.jsx` a `.js`, ya que Babel no ajusta las extensiones automáticamente. Ver la documentación del framework para más detalle sobre este problema conocido.

### 2. Abrir la aplicación

Servir `index.html` con cualquier servidor estático (por ejemplo, la extensión Live Server de VS Code, o `npx serve`), ya que los ES Modules no funcionan correctamente abriendo el archivo directamente con `file://`.

```bash
npx serve .
```

## Arquitectura de la aplicación

### Estado global (`store.js`)

```js
const initialState = {
    tasks: [],
    developers: ['Laura', 'Carlos', 'Victor']
};
```

El store se crea una única vez con `createStore(taskReducer, initialState)` y se comparte importándolo desde `store.js` en cualquier componente que lo necesite (`App.jsx`, `TaskForm.jsx` indirectamente vía props).

### Acciones (`actions.js`)

Se definen tres *action creators* con `createAction`:

| Acción | Payload | Descripción |
|---|---|---|
| `CREATE_TASK` | `{ id, title, developer, status }` | Crea una nueva tarea con estado inicial `NEW`. |
| `MOVE_TASK` | `{ id, newStatus }` | Cambia el estado de una tarea existente. |
| `DELETE_TASK` | `id` | Elimina una tarea por su `id`. |

### Reducer (`reducer.js`)

`taskReducer` es una función pura que recibe el estado actual y una acción, y devuelve un nuevo estado sin mutar el anterior:

- **`CREATE_TASK`**: agrega la nueva tarea al final del array `tasks`.
- **`MOVE_TASK`**: recorre `tasks` con `.map`, y a la tarea cuyo `id` coincide le actualiza el campo `status`; el resto de tareas se devuelven sin cambios.
- **`DELETE_TASK`**: filtra el array `tasks`, excluyendo la tarea cuyo `id` coincide con el payload.
- Si la acción no coincide con ninguno de los tipos anteriores, se devuelve el estado sin cambios (comportamiento estándar de un reducer).

### Constantes de estado (`constanst.js`)

Los tres posibles estados de una tarea se centralizan como constantes (`NEW`, `IN_PROGRESS`, `DONE`) para evitar *strings* repetidos y errores de tipeo al comparar estados en distintos archivos.

### Punto de entrada (`main.jsx`)

```jsx
const render = () => {
    update(root, <App />);
}

store.subscribe(render);
render();
```

Se suscribe la función `render` al store, de modo que **cada `dispatch`** (crear, mover o eliminar una tarea) dispara automáticamente un nuevo render de toda la aplicación con el estado actualizado.

## Componentes

### `App.jsx` (raíz)

Define los tres *handlers* que traducen eventos de UI en `dispatch` de acciones (`handleCreateTask`, `handleMoveTask`, `handleDeleteTask`), lee el estado actual con `store.getState()` y lo pasa como props a `TaskForm` y `Board`.

### `TaskForm.jsx`

Formulario controlado manualmente vía DOM (`document.getElementById`) en lugar de estado reactivo por input, dado que el framework no cuenta con *hooks* de estado local. Al hacer clic en "Crear Tarea", lee los valores del `input` de título y del `select` de desarrollador, invoca `onCreateTask(title, dev)` y limpia el campo de texto.

### `Board.jsx`

Filtra el array completo de `tasks` en tres subconjuntos según su `status`, y renderiza una `Column` por cada uno (`Nuevos`, `En Desarrollo`, `Realizados`), delegando hacia abajo los handlers `onMoveTask` y `onDeleteTask`.

### `Column.jsx`

Recibe una lista ya filtrada de tareas y un título, y renderiza una `TaskCard` por cada tarea, usando `key={task.id}` (aunque, según el framework actual, la reconciliación es por índice y no usa realmente esa `key` para el diffing).

### `TaskCard.jsx`

Muestra el título y el desarrollador de la tarea, y calcula dinámicamente qué botón de acción mostrar según el `status` de la tarea (`Iniciar Desarrollo` / `Terminar Tarea` / `Eliminar`).

> **Nota de implementación (dejada como comentario en el propio código):** el botón se arma siempre dentro de una variable (`actionButton`) usando `if/else if` en vez de operadores condicionales cortos como `status === NEW && <button>...</button>`. Esto es intencional: el framework **no descarta valores `false`** al construir el árbol virtual, por lo que si `status` no coincidiera con la condición, el `&&` devolvería `false` y el framework intentaría crear un nodo DOM a partir de ese `false`, rompiendo el render. Usar `if/else if` garantiza que `actionButton` siempre sea un elemento válido.

## Flujo de datos (resumen)

```
Usuario interactúa (crear / mover / eliminar tarea)
        │
        ▼
Componente llama a un handler (ej. onCreateTask)
        │
        ▼
App.jsx → store.dispatch(ACTION(payload))
        │
        ▼
taskReducer calcula el nuevo estado
        │
        ▼
store notifica a los listeners (render)
        │
        ▼
update(root, <App />) reconcilia el DOM con el nuevo estado
```

## Limitaciones conocidas

- El formulario de creación de tareas no valida campos vacíos (se puede crear una tarea sin título).
- No hay persistencia: al recargar la página se pierde todo el estado (no usa `localStorage` ni backend).
- La `key` en `TaskCard` no tiene efecto real en la reconciliación, ya que el framework actual compara hijos por índice y no por identidad.
