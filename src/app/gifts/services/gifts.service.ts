import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gift, SearchGiftsResponse } from '../interfeces/gitfs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GiftsService {


  apiKey = 'oXw8SZ7PRuQTI2uxQI4HhGuBPHPTit8Y'
  private _historial: string[] = [];
  public results: Gift[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor(
    private httpClient:HttpClient
  ){
    
      this._historial = JSON.parse( localStorage.getItem('historial')! ) || []
  }

  formatQuery = (query:string):string => query.trim().toLocaleLowerCase();

  validateEmptyQuery = (query:string):boolean => query.length === 0
  
  checkOnlyNineItems = ([...historial]:string[]):string[] => historial.splice(0,9);

  validateRepetedNameItem = ([...historial]:string[],query:string):boolean => historial.includes(query)
  
  searchGifts(query:string=''):any{
    query = this.formatQuery(query);
    if(this.validateEmptyQuery(query)) return  null;
    if(this.validateRepetedNameItem(this._historial,query)) return null
    this._historial= this.checkOnlyNineItems(this._historial)
    this._historial.unshift(query);
    localStorage.setItem('historial', JSON.stringify(this._historial))

    
//?api_key=oXw8SZ7PRuQTI2uxQI4HhGuBPHPTit8Y&q=dragonm%20ball%20z&limit=10
    this.httpClient.get<SearchGiftsResponse>(
      'https://api.giphy.com/v1/gifs/search',
      {
        params:{
          api_key:'oXw8SZ7PRuQTI2uxQI4HhGuBPHPTit8Y',
          q:query,
          limit:10
        }
      }
      )
    .subscribe(
      ( resp:SearchGiftsResponse ) => {
        console.log(resp.data);
        this.results = resp.data;
      }
    )
  }


}
