import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { TodoService } from "./todo.service";

@Component({
  selector: "app-root",
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center" class="content">
      <h1>
        Welcome to {{title}}!
      </h1>
      {{todoForm.value | json}}<br/>
      <div class="alert alert-danger" *ngIf="errorMsg">
      {{errorMsg}}
      </div>
      <div class="container">
      <form [formGroup]="todoForm"   novalidation (ngSubmit)="OnSubmit()" *ngIf="!submitted" >
       {{todoForm.get('description')}}
      <div class="form-group">
      <label>Title</label>
      <input type="text" class="form-control"  [class.is-invalid]="Item.invalid && Item.touched" formControlName="item">
      <div *ngIf="Item.invalid && Item.touched" class="alert-danger" >
         <small class="text-danger" *ngIf="Item.errors.required"  >The title can't be blank</small>
         <small class="text-danger" *ngIf="Item.errors.minlength"  >Title should contain atleast 4 letter</small>
      </div>

      </div>
      <div class="form-group ">
      <label>Description</label>
      <textarea class="form-control" required  [class.is-invalid]="Desc.invalid && Desc.touched" formControlName="description" ></textarea>

      </div>
       <button [disabled]="!todoForm.valid" type="submit" class="btn btn-primary">Submit</button>
      </form>
      </div>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  constructor(private fb: FormBuilder, private _todoService: TodoService) {}
  title = "todo-form-master";
  errorMsg = '';
  submitted = false;
  get Item(): any {
    return this.todoForm.get("item");
  }
  get Desc(): any {
    return this.todoForm.get("description");
  }
  todoForm = this.fb.group({
    item: ["buikder todo", [Validators.required, Validators.minLength(4)]],
    description: ["", Validators.required],
  });

  OnSubmit(): void {
    this.submitted = true;
    this._todoService.todoPost(this.todoForm.value).subscribe(
      (response: any) => console.log("Success", response),
      (error: any) => this.errorMsg = error,
    );
  }
}
