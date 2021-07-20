import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipes:Recipe[];
  subscription:Subscription;
  constructor(private recipeService:RecipeService) { }

  ngOnInit(): void {

    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes:Recipe[]) =>{
        this.recipes = recipes;
      });

    this.recipes = this.recipeService.getRecipe();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
