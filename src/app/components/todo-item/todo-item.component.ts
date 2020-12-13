import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: any;
  @Output() onTodoStatusChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() onTodoDelete: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  getClassSwitchStatus(completed) {
    if (completed) {
      return 'my-2 hover-ach list-group-item bg-primary text-light d-flex justify-content-between align-items-center'
    }
    return 'my-2 hover-ach list-group-item d-flex justify-content-between align-items-center'
  }

  changeTodoStatus() {
    this.onTodoStatusChange.emit(this.todo);
  }
  deleteTodo() {
    this.onTodoDelete.emit(this.todo.id);
  }
}