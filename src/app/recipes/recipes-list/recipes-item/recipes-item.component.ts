import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {

  @Input() recipe: Recipe;
  @Output() recipeSelect = new EventEmitter<void>()
  constructor() { }

  ngOnInit(): void {
  }

  onSelect(){
    this.recipeSelect.emit()
  }

}
