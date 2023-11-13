import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AssignTripVehicleDto } from 'src/app/models/assignTripVehicleDto';
import { TripDto } from 'src/app/models/tripDto';
import { VehicleDriverDto } from 'src/app/models/vehicleDriverDto';
import { DriverService } from 'src/app/services/driver.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-load-trip',
  templateUrl: './load-trip.component.html',
  styleUrls: ['./load-trip.component.css'],
  providers: [ MessageService]
})
export class LoadTripComponent implements OnInit {
  drivers!: VehicleDriverDto[];
  trips: TripDto[] | undefined;
  clonedTable: { [s: string]: VehicleDriverDto } = {};
  tripVehicle: AssignTripVehicleDto | undefined;
  totalRecords: number = 0;
  currentPage: number = 1;
  id_driver: string = ""
  constructor(private vehicleDriverService: DriverService, private tripService: TripService, private messageService: MessageService, public ref: DynamicDialogRef) { }
  ngOnInit(): void {
    this.getVehiclesEntered(this.currentPage);
  }
  getVehiclesEntered(page: Number, idDriver?: string) {
    if(idDriver !== null){
      this.vehicleDriverService.getVehicleDriversEntered(page, idDriver).subscribe(
        {
          next: data => {
            this.drivers = [...data.content]
            this.totalRecords = data.totalElements
          }
        }
      )
    }else{
      this.vehicleDriverService.getVehicleDriversEntered(page).subscribe(
        {
          next: data => {
            this.drivers = [...data.content]
            this.totalRecords = data.totalElements
          }
        }
      )
    }
    
  }
  handleEnterKey(event: any): void {
    if (event.key === 'Enter') {
      console.log(event.key)
      this.getVehiclesEntered(this.currentPage,this.id_driver);
      this.id_driver = '';
    }
  }
  getTripForVehicle(license_plate: string) {
    this.tripService.getTripsVehicleZone(license_plate).subscribe(
      {
        next: data => {
          this.trips = [...data]
        }
      }
    )
  }

  onPageChange(event: any) {
    let current = this.currentPage = event.page + 1;
    this.getVehiclesEntered(current);
  }

  onRowEditInit() {
  }

  onRowEditSave(driver: any) {
    let tripVehicle = this.tripVehicle = {
      driver_name: driver.driver_name,
      nit: driver.nit,
      identification_card: driver.identification_card,
      license_plate: driver.license_plate,
      id_trip:driver.selectTrip.id
    }   
    this.vehicleDriverService.assignTripToVehicle(tripVehicle).subscribe(
      {
        next: vehicleDriver => {        
          console.log(vehicleDriver)
          this.id_driver = ""
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: `${JSON.stringify(vehicleDriver)}` });
          this.ngOnInit();
        },
        error: error => {            
          console.error(error);
          this.messageService.add({ severity: 'error', summary: 'Reject', detail: `${error.message}` });
      }
    }
    )
  }

  onRowEditCancel() {
    this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'No se asigno ningun viaje' });
  }
  

}
