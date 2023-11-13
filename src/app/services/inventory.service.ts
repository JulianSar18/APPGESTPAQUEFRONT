import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/constants';
import { PackageDto } from '../models/packageDto';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient, private apiUrl: Constants) { }

  addPackage(packageDto: PackageDto): Observable<PackageDto>{
    return this.http.post(`${this.apiUrl.API_URL_PARAMETRIC}/inventory`,packageDto,{responseType: "json"});
  }
  uploadInventory(file: File): Observable<any>{
    const formData: FormData = new FormData();
        // Appends file to formData to be sent under key "file"
        formData.append("file", file);
    return this.http.post(`${this.apiUrl.API_URL_PARAMETRIC}/upload/inventory`, formData, {responseType: "text"})
  }
}
