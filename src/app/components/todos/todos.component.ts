import { Component, OnInit } from '@angular/core';
import { Todo } from './../../models/Todo';
import { TodoService } from './../../services/todo.service'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  newTodo: string = '';

  constructor(private todoService: TodoService) {
    this.getAllTodos()
  }

  ngOnInit() {
  }

  getAllTodos() {
    this.todoService.getAllTodos().then((resp) => {
      this.todos = resp.data
    })
  }
  addTodo(e) {
    e.stopPropagation()
    if (this.newTodo) {
      this.todoService.newTodo({
        title: this.newTodo,
        completed: false
      }).then(() => {
        this.getAllTodos()
        this.newTodo = '';
      })

    }
  }
  changeTodoStatus(todo) {
    todo.completed = todo.completed ? false : true //toggle
    this.todoService.changeTodoStatus(todo).then((resp) => {
      this.getAllTodos()
      console.log(resp);
    })

  }
  deleteTodo(id) {
    this.todoService.deleteTodo(id).then(() => {
      this.getAllTodos()
    })
  }
}
