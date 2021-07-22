import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  @Output() navigation = new EventEmitter <string>();
  constructor(private dataStorageService:DataStorageService) { }

  ngOnInit(): void {
  }
  
  onSelect(feature:string){
    this.navigation.emit(feature)
  }

  onSaveData(){
    this.dataStorageService.storeRecipe().subscribe(
      res => console.log('saved recipes !')
    )
  }
  onFetchData(){
    this.dataStorageService.fetchRecipe().subscribe()
  }
}
