import todoStore from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos } from './use-cases';

const elementIds = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
}

/**
 * 
 * @param {String} elementId 
 */

export const App = ( elementId ) => {

    const returnTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( elementIds.TodoList, todos);

    }

    // when the function is call
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
        returnTodos();
    })();

    // References HTML
    const newDescriptionInput = document.querySelector( elementIds.NewTodoInput );
    const todoListUL = document.querySelector( elementIds.TodoList );

    newDescriptionInput.addEventListener('keyup', ( event ) => {
        if ( event.keyCode !== 13 ) return;
        if ( event.target.value.trim().length === 0 ) return;

        todoStore.addTodo( event.target.value );
        returnTodos();
        event.target.value = '';
    })

    todoListUL.addEventListener('click' , ( event ) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo( element.getAttribute('data-id') );
        returnTodos();



    })
}