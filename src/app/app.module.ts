import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TodosComponent } from './components/todos/todos.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { AboutComponent } from './components/about/about.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/inc/navbar/navbar.component';

const routes: Routes = [
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  { path: 'todos', component: TodosComponent },
  { path: 'about', component: AboutComponent },

];
@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoItemComponent,
    AboutComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule, FormsModule, RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
