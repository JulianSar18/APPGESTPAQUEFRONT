import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/constants';
import { TripDto } from '../models/tripDto';
import { VehiclePackagesDto } from '../models/vehiclePackagesDto';
import { PackageToDeliverDto } from '../models/packageToDeliverDto';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient, private apiUrl: Constants) { }

  getTripsVehicleZone(license_plate: string): Observable<TripDto[]>{
    return this.http.get<TripDto[]>(`${this.apiUrl.API_URL_OPERATIONAL}/getTripsVehicleZone?license_plate=${license_plate}`)
  }

  getVehiclePackages(id_driver: string) : Observable<VehiclePackagesDto>{
    return this.http.get<VehiclePackagesDto>(`${this.apiUrl.API_URL_TRACKING}/getVehiclePackages?id_driver=${id_driver}`)
  }

  checkDelivery(packageToDeliverDto: PackageToDeliverDto, id_driver: string) : Observable<any>{
    return this.http.put(`${this.apiUrl.API_URL_TRACKING}/checkDelivery?id_driver=${id_driver}`,{...packageToDeliverDto}, {responseType: "text"})
  }

  getAllTrips(page: number, id_driver?: string): Observable<any>{
    let url = `${this.apiUrl.API_URL_SUMMARY}/getAllTrips?page=${page}`
    if (id_driver) {
      url += `&id_driver=${id_driver}`;
    }
    return this.http.get(url)
  }
}
