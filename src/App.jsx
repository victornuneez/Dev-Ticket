// Su responsabilidad es devolver la estructura principal de la pagina.
// Sin un contenedor principal, no se tiene donde montar los componentes hijos.

export const App = (props) => {
    return (
        <div id="app">
            <h1>Ticket-Dev</h1>
        </div>
    );
};