import { Component, ElementRef, ViewChild } from '@angular/core';
import { GiftsService } from '../services/gifts.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @ViewChild('txtSearch') txtSearch!:ElementRef<HTMLInputElement>;

  constructor(
    private giftsService:GiftsService,
    
  ){}

  public search() {
    const value = this.txtSearch.nativeElement.value;
    this.giftsService.searchGifts(value)
    this.txtSearch.nativeElement.value = '';
  }
}
