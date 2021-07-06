import { Component, OnInit } from '@angular/core';
import { Recipes } from './recipes.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {

  recipes: Recipes[] = [
    new Recipes('Test', 'this is a simply test', 'https://lorempixel.com/400/200/'),
    new Recipes('Test', 'this is a simply test', 'https://lorempixel.com/400/200/')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
