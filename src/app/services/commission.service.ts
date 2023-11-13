import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/constants'
import { CommissionDto } from '../models/commissionDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommissionService {

  constructor(private http: HttpClient, private apiUrl: Constants) { }

  createCommissionToCompany(commission: CommissionDto): Observable<CommissionDto>{
    return this.http.post(`${this.apiUrl.API_URL_PARAMETRIC}/commission`,commission,{responseType: "json"});
  }
}
