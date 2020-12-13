import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  baseUrl = "http://localhost:3000"
  todosUrl = "/todos"

  constructor() { }

  async getAllTodos() {
    return await axios.get(this.baseUrl + this.todosUrl)
  }
  async newTodo(todo) {
    return await axios.post(this.baseUrl + this.todosUrl,todo)
  }
  async changeTodoStatus(todo) {
    return await axios.patch(this.baseUrl + this.todosUrl + "/" + todo.id, todo)
  }
  async deleteTodo(id) {
    return await axios.delete(this.baseUrl + this.todosUrl + "/" + id)
  }
}
