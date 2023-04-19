import { Todo } from '../todos/models/todo.model';

const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'pending'
}

const state = {
    todos: [
        new Todo('pieda del alma'),
        new Todo('pieda del infierno'),
        new Todo('piedad del tiempo'),
    ],
    filter: Filters.All,
}

const initStore = () => {
    console.log(state);
    console.log('initstore 🦀');
}

export default {
    initStore,
}