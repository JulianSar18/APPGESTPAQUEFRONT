import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class LiquidationService {

  constructor(private http: HttpClient, private apiUrl: Constants) { }

  calculateLiquidationsCompletedTrip(): Observable<any>{
    return this.http.get(`${this.apiUrl.API_URL_LIQUIDATOR}/manual/ExecuteProcedure`, {responseType: 'text'});
  }

  getAllLiquidations(page: number): Observable<any>{
    return this.http.get(`${this.apiUrl.API_URL_LIQUIDATOR}/getAll?page=${page}`);
  }

  exportPdf(): Observable<any>{
    return this.http.get((`${this.apiUrl.API_URL_LIQUIDATOR}/pdf/liquidations`), {responseType: 'arraybuffer'})
  }
}
