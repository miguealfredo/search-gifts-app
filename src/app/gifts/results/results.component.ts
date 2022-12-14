import { Component } from '@angular/core';
import { GiftsService } from '../services/gifts.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {

  get results(){
    return this.giftsService.results
  }
  constructor(
    private giftsService:GiftsService,
  ){}

}
