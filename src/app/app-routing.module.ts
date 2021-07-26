import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth/auth-guard.guard';
import { AuthComponent } from './auth/auth.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ResolveService } from './recipes/resolve.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes:Routes = [
    {path:"" , redirectTo:'/recipes', pathMatch:"full"},
    // {path:'', component:AuthComponent},
    {path:'auth', component:AuthComponent},
    {path:"recipes" , component:RecipesComponent, canActivate:[AuthGuardGuard] , children: [
    {path:"", component:RecipeStartComponent},
    {path:"new", component:RecipeEditComponent},
    {path:":id", component:RecipesDetailComponent, resolve:[ResolveService]},
    {path:":id/edit", component:RecipeEditComponent , resolve:[ResolveService]},
  ]},
  {path:"shopping-list" , component:ShoppingListComponent,},
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
