import { Component, OnInit, OnDestroy } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InventoryComponent } from '../inventory/inventory.component';
import { ContractorComponent } from '../contractor/contractor.component';
import { Router } from '@angular/router';
import { TripService } from 'src/app/services/trip.service';
import { SummaryTrip } from 'src/app/models/summaryTripDto';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css'],
  providers: [DialogService]
})
export class AdministratorComponent implements OnInit, OnDestroy{
  ref: DynamicDialogRef | undefined;
  user: string = "Administrador@correo.com";
  totalEl: number = 0;
  currentPage: number = 1;
  trips!: SummaryTrip[];
  constructor(private router: Router, public dialogService:DialogService, private tripService: TripService){
  } 

  ngOnInit(): void {
    this.getAllTrips(this.currentPage);
  }

  onPageChange(event: any) {
    let current = this.currentPage = event.page + 1;
    this.getAllTrips(current);
  }

  getAllTrips(page: number){
    this.tripService.getAllTrips(page).subscribe({
      next: data => {
        this.trips = [...data.content]
        this.totalEl = data.totalElements
        console.log(this.totalEl)
      }
    })
  }

  addPackage(){
    this.ref = this.dialogService.open(InventoryComponent, {
      header: 'Registro inventario'
    })
  }

  addContractor(){
    this.ref = this.dialogService.open(ContractorComponent,{
      header: 'Registro Contratistas'
    })
  }

  goPayment(){
    this.router.navigate(['/payment'])
  }

  ngOnDestroy(): void {
    if(this.ref){
      this.ref.close();      
    }
  }
}
