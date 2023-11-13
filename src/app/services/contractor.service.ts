import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Constants } from 'src/constants'
import { Observable } from 'rxjs';
import { ContractorDto } from '../models/contractorDto';
import { VehicleDriverDto } from '../models/vehicleDriverDto';

@Injectable({
  providedIn: 'root'
})
export class ContractorService {

  constructor(private http: HttpClient, private apiUrl: Constants) { }



  getCompanies(): Observable<ContractorDto[]>{
    return this.http.get<ContractorDto[]>(`${this.apiUrl.API_URL_SUMMARY}/getCompanies`)
  }

  getCompaniesWithOutCommission(): Observable<ContractorDto[]>{
    return this.http.get<ContractorDto[]>(`${this.apiUrl.API_URL_SUMMARY}/getCompaniesWithOutCommission`)
  }

  createCompanie(companie: ContractorDto): Observable<ContractorDto>{
    return this.http.post(`${this.apiUrl.API_URL_PARAMETRIC}/contractor`,companie,{responseType: "json"});
  }

  createVehicledriver(vehicleDriver: VehicleDriverDto): Observable<VehicleDriverDto>{
    return this.http.post(`${this.apiUrl.API_URL_PARAMETRIC}/vehicleDriver`,vehicleDriver,{responseType: "json"});
  }

  createVehiclesDrivers(file: File): Observable<any>{
    const formData: FormData = new FormData();
        // Appends file to formData to be sent under key "file"
        formData.append("file", file);
    return this.http.post(`${this.apiUrl.API_URL_PARAMETRIC}/upload/vehicleDrivers`, formData, {responseType: "text"})
  }
}
