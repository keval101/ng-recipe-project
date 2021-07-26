import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipes.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http:HttpClient, private recipeService:RecipeService, private _authService:AuthService) { }

  url = 'https://recipeproject-f2718-default-rtdb.firebaseio.com/recipe'

  storeRecipe(){
    const recipes = this.recipeService.getRecipe();
    return this.http.put('https://recipeproject-f2718-default-rtdb.firebaseio.com/recipe.json', recipes)
  }

  fetchRecipe(){

        return this.http.get<Recipe[]>('https://recipeproject-f2718-default-rtdb.firebaseio.com/recipe.json')
        .pipe(
          map( recipes => {
            return recipes.map(recipe => {
              return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
            })
          }),
          tap( recipes => {
            this.recipeService.setRecipes(recipes)
          })
        )
     
        }
}

