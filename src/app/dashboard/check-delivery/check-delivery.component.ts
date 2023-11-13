import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PackageToDeliverDto } from 'src/app/models/packageToDeliverDto';
import { VehiclePackagesDto } from 'src/app/models/vehiclePackagesDto';
import { RefreshService } from 'src/app/services/refresh.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-check-delivery',
  templateUrl: './check-delivery.component.html',
  styleUrls: ['./check-delivery.component.css'],
  providers: [MessageService]
})
export class CheckDeliveryComponent implements OnInit {
  identification: string = "";
  vehiclePackages: VehiclePackagesDto = {
    license_plate: '',
    name_trip: '',
    id_trip: 0,
    packages: []
  };
  disable: boolean = false;
  selectPackage: PackageToDeliverDto | undefined;
  constructor(private refreshService: RefreshService, public ref: DynamicDialogRef, public config: DynamicDialogConfig, private messageService: MessageService, private tripService: TripService) {
    this.identification = config.data.identification;
  }
  ngOnInit(): void {
    this.getVehiclePackages(this.identification);
  }
  
  getVehiclePackages(id_driver: string) {
    this.tripService.getVehiclePackages(id_driver).subscribe(
      {
        next: data => this.vehiclePackages = data,
        error: error => console.log(error)
      }
    )
  }

  checkDelivery() {
    console.log(this.selectPackage)
    let selectPackage = this.selectPackage;
    if (selectPackage != undefined) {
      this.tripService.checkDelivery(selectPackage, this.identification).subscribe(
        {
          next: data => {
            this.messageService.add({ severity: 'info', summary: 'Success', detail: `${data}` });
            this.disable = true
            setTimeout(() => {   
              this.ref.close()
              this.refreshService.setRefreshSummaryTrip(true);
            }, 1500);
          },
          error: error => console.log(error)
        }
      )
    }

  }
}
