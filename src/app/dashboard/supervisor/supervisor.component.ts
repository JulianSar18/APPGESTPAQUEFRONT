import { Component, OnDestroy } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EntryComponent } from '../entry/entry.component';
import { LoadTripComponent } from '../load-trip/load-trip.component';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.css'],
  providers: [DialogService]
})
export class SupervisorComponent  implements OnDestroy{
  ref: DynamicDialogRef | undefined;
  user: string = "supervisor@correo.com"
  constructor(public dialogService:DialogService){
  } 
  driverEntry(){
    this.ref = this.dialogService.open(EntryComponent, {
      header: 'Ingreso conductor'
    })
  }

  loadTrip(){
    this.ref = this.dialogService.open(LoadTripComponent, {
      header: 'Carga el viaje al vehiculo'
    })
  }

  ngOnDestroy(): void {
    if(this.ref){
      this.ref.close();
    }
  }
}
