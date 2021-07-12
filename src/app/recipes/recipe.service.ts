import { EventEmitter, Injectable } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipes.model';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private shoppingListService:ShoppingListService) { }
    
  recipeSelected = new EventEmitter<Recipe>()

  private recipes: Recipe[] = [
    new Recipe(
      'Dish One',
      'this dish one is so testy',
      'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg',
      [
        new Ingredients('Meat', 1),
        new Ingredients('French Fries', 20)
      ]),
    new Recipe('Dish Two',
    'this dish two is a simply test',
    'https://static01.nyt.com/images/2021/03/28/dining/mc-shakshuka/mc-shakshuka-articleLarge.jpg',
    [
      new Ingredients('Buns', 2),
      new Ingredients('Meat', 1)
    ])
  ];
  
  getRecipe(){
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients:Ingredients[]){
    this.shoppingListService.addIngredients(ingredients);
  }
}