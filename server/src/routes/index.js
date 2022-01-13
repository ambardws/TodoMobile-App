const express = require('express');

const router = express.Router();

const {getTodo, addTodo, updateTodo, deleteTodo} = require ('../controllers/todolist')

router.get('/todo', getTodo)
router.post('/todo', addTodo)
router.patch('/todo/:id', updateTodo)
router.delete('/todo/:id', deleteTodo)

module.exports = router;