import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/constants';
import { ZoneDto } from '../models/zoneDto';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  constructor(private http: HttpClient, private apiUrl: Constants) { }
  

  getZones(): Observable<ZoneDto[]>{
    return this.http.get<ZoneDto[]>(`${this.apiUrl.API_URL_SUMMARY}/getZones`)
  }
}
