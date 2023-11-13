import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/constants';
import { VehicleDriverDto } from '../models/vehicleDriverDto';
import { AssignTripVehicleDto } from '../models/assignTripVehicleDto';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient, private apiUrl: Constants) { }
  getDriver(): Observable<VehicleDriverDto[]> {
    return this.http.get<VehicleDriverDto[]>(`${this.apiUrl.API_URL_SUMMARY}/getVehicleDrivers`)
  }

  getLicensePlateDriver(driver_id: string): Observable<VehicleDriverDto[]> {
    return this.http.get<VehicleDriverDto[]>(`${this.apiUrl.API_URL_SUMMARY}/getVehicleDrivers?driver_id=${driver_id}`)
  }

  updateVehicleIncome(vehicleDriver: VehicleDriverDto): Observable<VehicleDriverDto> {
    return this.http.put(`${this.apiUrl.API_URL_OPERATIONAL}/driverEntry`, { ...vehicleDriver })
  }

  getVehicleDriversEntered(page: Number, id_driver?: string): Observable<any> {
    let url = `${this.apiUrl.API_URL_OPERATIONAL}/getVehicleEntered?page=${page}`;

    if (id_driver) {
      url += `&id_driver=${id_driver}`;
    }
    return this.http.get(url)
  }

  assignTripToVehicle(assignTripToVehicle: AssignTripVehicleDto): Observable<any> {
    return this.http.put(`${this.apiUrl.API_URL_OPERATIONAL}/loadTrip`, { ...assignTripToVehicle }, { responseType: "text" })
  }
}
