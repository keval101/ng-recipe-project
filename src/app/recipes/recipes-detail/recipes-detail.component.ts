import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {

 recipe:Recipe;
 id:number

  constructor(private recipeService:RecipeService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipes(this.id)
      }
    )
  }

  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onDelete(){
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate(['/recipes'])
  }
}
