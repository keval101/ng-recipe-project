import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  LoadedFeature:string = 'recipe';
  
  onNavigation(feature:string){
    this.LoadedFeature = feature;
  }


}
