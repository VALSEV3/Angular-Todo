import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Todo} from "../models/todo"
import {NgFor, NgIf, NgClass} from "@angular/common";
import {TodoService} from "../services/todo.service";

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, NgClass],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent {
  todos: Todo[] = [];
  inputValue = '';
isOngoing=false

  constructor(private todoService: TodoService) {
    this.fetchTodos();
  }


  onAddClick() {
    if (this.inputValue) {
      let todo: Todo = {description: this.inputValue, completed: false, isEditing: false};
      this.inputValue = ''
      this.todoService.add(todo)
      this.fetchTodos();
      this.isOngoing=false;
    }
  }

  onDeleteClick(index: number) {
    if (confirm("delete item?")) {
      this.todoService.delete(index);
      this.fetchTodos();
      this.isOngoing=false;
    }
  }

  onEdit(index: number) {
    if(this.isOngoing==true){
      return
    }
    this.todos[index].isEditing = true
    this.isOngoing=true;

  }

  onSave(index: number, value: string) {
  if(value){
    const edited:Todo = this.todos[index];
    edited.description = value;
    this.todos[index].isEditing = false;
    this.todoService.update(edited, index);
    this.fetchTodos();
    this.isOngoing=false;
  }
    else{
      alert("Todo cannot be empty")

  }
  }

  cancel(index: number) {
    this.todos[index].isEditing = false;
    this.todos[index] = {...this.todos[index]};
    this.isOngoing=false;
  }

  deleteAll() {
    if (confirm("delete all?")) {
      this.fetchTodos();
      this.todos.splice(0,this.todos.length);
      this.todoService.setAll(this.todos)
      this.isOngoing=false;
    }
  }

  private fetchTodos(): void {
    this.todos = this.todoService.getAll()
  }


}
