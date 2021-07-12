import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  
  @ViewChild('nameInput' ,{static:false}) nameInputRef:ElementRef
  @ViewChild('amountInput' ,{static:false}) amountInputRef:ElementRef
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
  }
  
  onAddItem(){
    const IngName = this.nameInputRef.nativeElement.value
    const Amount = this.amountInputRef.nativeElement.value
    const newIngredient = new Ingredients(IngName, Amount);
    this.shoppingListService.addIngredient(newIngredient)
  }
}
