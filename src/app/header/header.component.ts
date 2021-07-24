import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{
  public isMenuCollapsed = true;
  isAuthenticate = false;
  subscription: Subscription;
  @Output() navigation = new EventEmitter <string>();
  constructor(private dataStorageService:DataStorageService , private _authService:AuthService) { }

  ngOnInit(): void {
    this.subscription= this._authService.userStore.subscribe(
      user => this.isAuthenticate = !!user
    )
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

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
