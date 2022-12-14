import { Component } from '@angular/core';
import { GiftsService } from 'src/app/gifts/services/gifts.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(
    private giftsService:GiftsService,
  ){}

  get historial(){
    return this.giftsService.historial;
  }

  public search(query:string){
    console.log(query)
    this.giftsService.searchGifts(query);
  }

}
