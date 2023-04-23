import { Todo } from '../todos/models/todo.model';

const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'pending'
}

const state = {
    todos: [
        new Todo('El alma desalmada'),
        new Todo('Las leyes del Universo'),
        new Todo('El todo en conjunto'),
        new Todo('Poderes de la realidad'),
    ],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
    console.log('initstore 🦀');
}

const loadStore = () => {
    if (!localStorage.getItem('state')) return;

    const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
}

const saveStateLocalStorage = () => {

    localStorage.setItem('state', JSON.stringify(state));
}

const getTodos = ( filter = Filters.All ) => {
    switch( filter ) {
        case Filters.All:
            return [...state.todos];

        case Filters.Completed:
            return state.todos.filter( todo => todo.done);

        case Filters.Pending:
            return state.todos.filter( todo => !todo.done );
        
        default:
            throw new Error(`Option ${ filter } is not valid.`)

    }
}

/**
 * 
 * @param {String} description 
 */
const addTodo = ( description ) => {
    if ( !description ) throw new Error('Description is requerid');
    state.todos.push( new Todo(description) ); 
    saveStateLocalStorage();
}


const toggleTodo = (todoId) => {
    const todoIndex = state.todos.findIndex((todo) => todo.id === todoId);
    if (todoIndex === -1) {
        throw new Error('Todo not found');
    }
    const updatedTodo = { ...state.todos[todoIndex], done: !state.todos[todoIndex].done };
    state.todos = [
        ...state.todos.slice(0, todoIndex),
        updatedTodo,
        ...state.todos.slice(todoIndex + 1),
    ];

    saveStateLocalStorage();
};


const deleteTodo = ( todoId) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId );
    saveStateLocalStorage();
}

const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => !todo.done );
    saveStateLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All) => {
    if (Object.keys(Filters).includes( newFilter )){
        state.filter = newFilter;
    } else {
        console.log('Error is not includes the filter')
    }
    saveStateLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}
export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
    getTodos,
}