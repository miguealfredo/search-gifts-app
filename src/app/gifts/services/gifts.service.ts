import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gift, SearchGiftsResponse } from '../interfeces/gitfs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GiftsService 
{
  public results: Gift[] = [];
  
  get historial()
  {
    return [...this._historial];
  }

  private baseUrl:string = 'https://api.giphy.com/v1/gifs/search'
  private apiKey:string = 'oXw8SZ7PRuQTI2uxQI4HhGuBPHPTit8Y'
  private _historial: string[] = [];
  private localStorageHistorial:string = 'historial'
  private localStorageResult:string = 'results'
  private giftsLimit:number = 10;
  /**
   * 
   * @param httpClient 
   */
  constructor
  (
    private httpClient:HttpClient
  ){
    
    this._historial = JSON.parse( localStorage.getItem(this.localStorageHistorial)! ) || []
    this.results = JSON.parse( localStorage.getItem(this.localStorageResult)! ) || []
  }
  
   /* 
   * @param query 
   * @returns 
   */
  private formatQuery = (query:string):string => query.trim().toLocaleLowerCase();
  /**
   * 
   * @param query 
   * @returns 
   */
  private validateEmptyQuery = (query:string):boolean => query.length === 0
  /**
   * 
   * @param param0 
   * @returns 
   */
  private checkOnlyNineItems = ([...historial]:string[]):string[] => historial.splice(0,9);
  /**
   * 
   * @param param0 
   * @param query 
   * @returns 
   */
  private validateRepetedNameItem = ([...historial]:string[],query:string):boolean => historial.includes(query)
  /**
   * 
   * @param query 
   * @returns 
   */
  private getImages = (q:string):Observable<SearchGiftsResponse> => 
  {
    return this.httpClient.get<SearchGiftsResponse>(
      this.baseUrl,
      {
        params:{
          api_key:this.apiKey,
          q,
          limit:this.giftsLimit
        }
      }
    )
  }
  /**
   * 
   * @param query 
   * @returns 
   */
  public searchGifts = (query:string=''):any => 
  {
    query = this.formatQuery(query);
    if(this.validateEmptyQuery(query)) return  null;
    if(!this.validateRepetedNameItem(this._historial,query))
      this.historialBuild(query);
    this.giftsLoad(query);
  }

  private historialBuild = (query:string):void =>
  {
    this._historial= this.checkOnlyNineItems(this._historial);
    this._historial.unshift(query);
    localStorage.setItem(this.localStorageHistorial, JSON.stringify(this._historial));
  }

  private giftsLoad = (query:string):void => 
  {
    this.getImages(query).subscribe( ( resp:SearchGiftsResponse ) => this.results = resp.data);
    localStorage.setItem(this.localStorageResult, JSON.stringify(this.results));
  }


}
