import { RequestHandler, NextFunction } from 'express';
import { Todo } from '../models/todo';
 
const TODOS: Todo[] = [{id: Math.random().toString(), text: "Finish the course"}];

export const createTodo: RequestHandler = (req, res, next) => {
    const text = (req.body as {text: string}).text;
    const newTodo = new Todo(Math.random().toString(), text);
    
    TODOS.push(newTodo);

    res.status(201).json({message: 'Created', createdTodo: newTodo});
};

export const getTodos : RequestHandler = (req, res, next) => {
    res.json({todos: TODOS});
}

export const updateTodo : RequestHandler = (req, res, NextFunction) => {
    const id = (req.params as {id: string}).id;
    const text = (req.body as {text: string}).text
    TODOS.map(td => {
        if(td.id === id) {
           td.text = text; 
           res.status(201).json({message: 'Modified', modifiedTodo: text});
        }
        res.status(404).json({message: 'Not Found'});
        
    });

}

export const deleteTodo: RequestHandler = (req, res, next) => {
    const id = (req.params as {id: string}).id
    const index = TODOS.findIndex(td => td.id === id);

    if(index < 0) {
        res.status(404).json({message: `Not Found: ${id}`});
    }
    TODOS.splice(index, 1);
    

    res.status(201).json({message: 'deleted', deletedIndex: id});
}