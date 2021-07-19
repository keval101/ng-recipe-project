import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredients } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') slForm:NgForm;
  subscription:Subscription;
  editMode = false;
  editedItemIndex:number;
  editItem : Ingredients;
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
    this.shoppingListService.stratedEditing.subscribe(
      (index:number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name : this.editItem.name,
          amount : this.editItem.amount
        })
      }
    )
  }

  onAddItem(form: NgForm){
    const value = form.value
    const newIngredient = new Ingredients(value.name , value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
    } else {
    this.shoppingListService.addIngredient(newIngredient)
    }
}

  onSubmit(f){

  }
}
