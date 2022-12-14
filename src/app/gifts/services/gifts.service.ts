import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GiftsService {

  private _historial: string[] = [];

  get historial(){
    return [...this._historial];
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
  }
}
