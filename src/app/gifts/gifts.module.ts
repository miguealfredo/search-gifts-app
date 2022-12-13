import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GitsMainComponent } from './gits-main/gits-main.component';
import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './results/results.component';



@NgModule({
  declarations: [
    GitsMainComponent,
    SearchComponent,
    ResultsComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    GitsMainComponent,
  ]
})
export class GiftsModule { }
