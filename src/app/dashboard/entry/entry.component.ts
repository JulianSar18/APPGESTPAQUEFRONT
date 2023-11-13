import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { VehicleDriverDto } from 'src/app/models/vehicleDriverDto';
import { MessageService } from 'primeng/api';
import { DriverService } from 'src/app/services/driver.service';


@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css'],
  providers: [ MessageService]
})
export class EntryComponent implements OnInit {
  drivers: VehicleDriverDto[] | undefined;
  licensePlates: VehicleDriverDto[] | undefined;
  selectedIdentification: VehicleDriverDto | undefined;
  selectVehicle: VehicleDriverDto | undefined
  errorMessage: String = "";
  disable: boolean = false;
  constructor(private vehicleDriverService: DriverService, private messageService: MessageService, public ref: DynamicDialogRef) { }
  ngOnInit(): void {
    this.getDrivers();
    this.getLicensePlate();
  }

  getDrivers() {
    this.vehicleDriverService.getDriver().subscribe(
      drivers => this.drivers = [...drivers]
    )
  }

  getLicensePlate() {
    if (this.selectedIdentification?.identification_card != undefined) {
      this.vehicleDriverService.getLicensePlateDriver(this.selectedIdentification?.identification_card).subscribe(
        licensePlates => { this.licensePlates = [...licensePlates] })
    }
  }

  entryVehicle() {
    if (this.selectVehicle != undefined) {
      this.vehicleDriverService.updateVehicleIncome(this.selectVehicle).subscribe(
        {
          next: vehicleDriver => {
            this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: `El vehiculo ${vehicleDriver.license_plate} ingreso correctamente` });
            this.disable = true
            setTimeout(() => {             
              this.ref.close()
            }, 1500);
          },
          error: error => {            
            console.error(error);
            this.errorMessage = error.message;
            this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: `${this.errorMessage}` });
        }
        }
      )
    }
  }

}
