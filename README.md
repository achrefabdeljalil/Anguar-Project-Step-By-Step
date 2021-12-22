# Anguar-Project-Step-By-Step - Todo List -
## Angular Framework : 
How to Create an Angular Project from Scratch
1. Get Started : 
  - install git bash : https://git-scm.com/downloads (optional)	
  - install vscode : https://code.visualstudio.com    	
  - install nodejs : https://nodejs.org   	
  - install angular cli : run command in bash `npm install -g @angular/cli`
2. Create project `ng new projectName`
3. What is **package.json** 
4. How we can see **SPA** (Single page application) in project : **index.html**  : `<app-root></app-root>`
5. what is **angular.json** : style - script
6. **app.module.ts** : Component declaration - library - tools ... - 
7. app.component.ts 
  - imports 
  - Declaration : 
  ```Typescript
  @Component({
    selector: 'app-todos',
    templateUrl: './todos.component.html'
  }) 
  ```
  - Declare Var in **app.component.ts** : `name='Your Name'`
  - Display it in html : write :  `{{name.toUpperCase()}} - {{1+1}}`
  - Typescript & Typing : string, int, ...
  - constructor(){}
  - Method : ChangeName(){}
8. Cli : Generate a component : `ng g c components/todos`
9. add `<app-todos></app-todos>` to **app.component.html**
10. create a folder : **models/Todo.ts**
11. In Todo.ts put this code 
```Typescript
export class Todo {
    id: number;
    title: string;
    completed: boolean;
}
```
- import the model **Todo.ts** in the **todos Component**  (todos.component.ts)
```Typescript
import { Todo } from '../../models/Todo'
```
12. Declare todos table in **todos.component.ts** : ` todos: Todo[] `
13. Affect value to our table todo on **constructor** 
```Typescript
this.todos = [{
      "id": 1,
      "title": "Meet With Boss",
      "completed": false
    },
    {
      "id": 2,
      "title": "Dinner with wife",
      "completed": false
    },
    {
      "id": 3,
      "title": "Study Time ",
      "completed": false
    },
    {
      "id": 4,
      "title": "Outing with the family",
      "completed": true
    },
    {
      "id": 5,
      "title": "Buy home supplies",
      "completed": false
    },
    {
      "id": 6,
      "title": "Take the dog to the veterinarian",
      "completed": false
    }]
```
12. How To **For Loop** with **َAngular**
```
<div *ngFor="let t of todos">{{ t.id }} - {{ t.title }}</div>
```
13. How to Make condition in **Angular**
```
<div *ngFor="let t of todos">
  <span *ngIf="t.completed"> {{ t.id }} - {{ t.title }} </span>
</div>
```
14. Generate a **todoItem** Component : `ng g c components/todoItem`
15. Import **todoItem component** in **Todos Component** 
16. To pass a data from **Parent** component to **child** Component we use the **@input** option 
  - Add `import { Input } from '@angular/core';` in **todo-item.component.ts**
  - Declare the input var as an attribute in the **TodoItemComponent class** to recive data `@Input() todo: any;`
  - to pass data from **Todos Component** to **Todo Item Component** we should add an attribute in the Tags with **[]** : 
  `<app-todo-item [todo]="t"></app-todo-item>`
17. Now , Let's change our template for **Todo Item Component** : 
  - Put this code in **todo-item.component.html** :
  ```
  <li
  [class]="getClassSwitchStatus(todo.completed)"
  style="height: 2em; line-height: 50px; padding: 0px 15px"
>
  <span style="width: 90%"
    ><strong>{{ todo.id }} : </strong> {{ todo.title }}</span
  >
  <span class="badge badge-light badge-pill hover-ach">&times;</span>
</li>

  ```
  - And this code in **style.css** :
  ```
  .hover-ach:hover {
  cursor: pointer;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
}
app-todo-item {
  border-radius: 5px;
}
```
 - And this code in **todo-item.component.ts** :
```
 getClassSwitchStatus(completed) {
    if (completed) {
      return 'my-2 hover-ach list-group-item bg-primary text-light d-flex justify-content-between align-items-center'
    }
    return 'my-2 hover-ach list-group-item d-flex justify-content-between align-items-center'
  }
 ```
 18. Now our Todo list is displayed successfuly , but it is static 😶 
 lets make it dynamic 😎😎 : 
  - The new code of  **todos.component.html** will be : 
  ```
  <div class="container">
  <div class="input-group my-3">
    <input
      type="text"
      class="form-control"
      [(ngModel)]="newTodo"
      placeholder="New Todo"
    />
    <div class="input-group-append">
      <button
        class="btn btn-outline-primary"
        type="button"
        (click)="addTodo($event)"
      >
        New Todo
      </button>
    </div>
  </div>
  {{ newTodo }}
  <div *ngFor="let t of todos">
    <app-todo-item [todo]="t"></app-todo-item>
  </div>
</div>
  ```
  - and adding new attribute in **todos.component.ts** : `newTodo: string = '';` 
  - add this method to **todos.component.ts** :
  ```
  addTodo(e) {
    e.stopPropagation()
    if (this.newTodo) this.todos.push({ id: this.todos.length + 1, title: this.newTodo, completed: false })
    this.newTodo = ''
  }
  ```
  - and import this package in **app.module.ts** : `import { FormsModule } from '@angular/forms';`
  - and in the same file add `FormsModule` to **imports** tag
19. To pass a data from **Child** 🧑 component to **Parent** 🦳 Component we use the **@Output** option
  - import **output and eventEmmiter** classes by adding this code in import **todo-item.component.ts** : `import { Output, EventEmitter } from '@angular/core';`
  - declare new eventEmmiet to use in the **Carent Component** by adding this code to **todo-item.component.ts** : 
  `@Output() onTodoStatusChange: EventEmitter<string> = new EventEmitter<string>();`
  - also add this method in **todo-item.component.ts** : 
  ```
  changeTodoStatus() {
    this.onTodoStatusChange.emit(this.todo);
  }
  ```
  - Now , our code in **todo-item.component.html** will be 
  ```
  <li
  [class]="getClassSwitchStatus(todo.completed)"
  style="height: 2em; line-height: 50px; padding: 0px 15px"
>
  <span style="width: 90%" (click)="changeTodoStatus()"
    ><strong>{{ todo.id }} : </strong> {{ todo.title }}</span
  >
  <span class="badge badge-light badge-pill hover-ach">&times;</span>
</li>
  ```
  - and Now , let's recive this data in parent component by adding this method to **todos.component.ts** : 
  ```
  changeTodoStatus(todo) {
    let indexSelected = this.todos.findIndex((todoTmp) => {
      return todoTmp.id == todo.id
    })
    this.todos[indexSelected].completed = todo.completed ? false : true //toggle

  }
  ```
  - and also the new code of **todos.component.html** will be :
  ```
  <div class="container">
  <div class="input-group my-3">
    <input
      type="text"
      class="form-control"
      id="todosTitle"
      [(ngModel)]="newTodo"
      placeholder="New Todo"
    />
    <div class="input-group-append">
      <button
        class="btn btn-outline-primary"
        type="button"
        (click)="addTodo($event)"
      >
        New Todo
      </button>
    </div>
  </div>
  {{ newTodo }}
  <div *ngFor="let t of todos">
    <app-todo-item
      [todo]="t"
      (onTodoStatusChange)="changeTodoStatus($event)"
    ></app-todo-item>
  </div>
</div>
  ```
  - lets test our code ✅✅✅
20. In this stage we can **create** , **display** and **change status** of our todos , to complete the **crud** concept we have to add **delete** option 
  - with the same concept of **change status** we will add the **delete** option
  - where the **delete Button** is in the **child Component** we have to work with the **EventEmmiter** and **@Output** option
  - First of all let's add the **click event** in the **Delete Button** , so the new code of **todo-item.component.html** is :
  ```
   <li
      [class]="getClassSwitchStatus(todo.completed)"
      style="height: 2em; line-height: 50px; padding: 0px 15px">
      <span style="width: 90%" (click)="changeTodoStatus()"
        ><strong>{{ todo.id }} : </strong> {{ todo.title }}</span>
      <span class="badge badge-light badge-pill hover-ach" (click)="deleteTodo()">&times;</span>
  </li>
  ```
  - lets declare the **eventEmmiter** in **todo-item.component.ts** `@Output() onTodoDelete: EventEmitter<string> = new EventEmitter<string>();`
  - and add this method :
  ```
      deleteTodo() {
        this.onTodoDelete.emit(this.todo.id);
      }
  ```
  - Now Let's take a look to the **parent Component** :
  - The new template of **todos.component.html** is :
  ``` 
        <div class="container">
        <div class="input-group my-3">
        <input
          type="text"
          class="form-control"
          id="todosTitle"
          [(ngModel)]="newTodo"
          placeholder="New Todo"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-primary"
            type="button"
            (click)="addTodo($event)"
          >
            New Todo
          </button>
        </div>
        </div>
        <div *ngFor="let t of todos">
          <app-todo-item
          [todo]="t"
          (onTodoStatusChange)="changeTodoStatus($event)"
          (onTodoDelete)="deleteTodo($event)"
          ></app-todo-item>
        </div>
        </div>
  ```       
  - and add this method in **todo.component.ts** :
  ```
    deleteTodo(id) {
    this.todos = this.todos.filter((todoTmp) => {
      return todoTmp.id != id
    })
    }
  ```
## Angular with Json-Server (Database)
1. First of all , let's intall the required packages 
  - **json-server** : `npm i json-server` 
  - **axios** : `npm i axios`
  - add this code to the script tag in **package.json** file :`"json:serve": "json-server --watch server/db.json"`
  - add folder in the main path with **server** name 
  - run this command : `npm run json:serve`
  - put this code in **db.json** after deleting the default content
  ```
  {
  "todos":[{
    "id": 1,
    "title": "Meet With Boss",
    "completed": false
  },
  {
    "id": 2,
    "title": "Dinner with wife",
    "completed": false
  },
  {
    "id": 3,
    "title": "Study Time ",
    "completed": true
  },
  {
    "id": 4,
    "title": "Outing with the family",
    "completed": true
  },
  {
    "id": 5,
    "title": "Buy home supplies",
    "completed": false
  },
  {
    "id": 6,
    "title": "Take the dog to the veterinarian",
    "completed": false
  }]
  
}
  ```
2. lets generate our **service** to connect with **Json-Server** : `ng g s services/todo`
3. To work with an external DB we have to use **HTTP Request** and in our project      
we will use **axios** that make an easy Http request with **simple ui**
  - So lets import it from **Node Module** by putting this code in **services/todo.services.ts** : `import axios from 'axios';`
  - new code **todo.service.ts** 
  ```
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
}
  ```
  - new code **todos.component.ts** : 
  ```
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
    let indexSelected = this.todos.findIndex((todoTmp) => {
      return todoTmp.id == todo.id
    })
    this.todos[indexSelected].completed = todo.completed ? false : true //toggle

  }
  deleteTodo(id) {
    this.todos = this.todos.filter((todoTmp) => {
      return todoTmp.id != id
    })
  }
}
}
  ```
