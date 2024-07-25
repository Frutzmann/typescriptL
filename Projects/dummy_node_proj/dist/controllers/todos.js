"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const TODOS = [{ id: Math.random().toString(), text: "Finish the course" }];
const createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = new todo_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: 'Created', createdTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res.json({ todos: TODOS });
};
exports.getTodos = getTodos;
const updateTodo = (req, res, NextFunction) => {
    const id = req.params.id;
    const text = req.body.text;
    TODOS.map(td => {
        if (td.id === id) {
            td.text = text;
            res.status(201).json({ message: 'Modified', modifiedTodo: text });
        }
        res.status(404).json({ message: 'Not Found' });
    });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    const id = req.params.id;
    const index = TODOS.findIndex(td => td.id === id);
    if (index < 0) {
        res.status(404).json({ message: `Not Found: ${id}` });
    }
    TODOS.splice(index, 1);
    res.status(201).json({ message: 'deleted', deletedIndex: id });
};
exports.deleteTodo = deleteTodo;
