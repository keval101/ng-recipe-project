import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from './recipes.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  @Output() recipeWasSelect = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('Test', 'this is a simply test', 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg'),
    new Recipe('Test', 'this is a simply test', 'https://static01.nyt.com/images/2021/03/28/dining/mc-shakshuka/mc-shakshuka-articleLarge.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }
  
  onRecipeSelect(recipe:Recipe){
    this.recipeWasSelect.emit(recipe)
  }
}
