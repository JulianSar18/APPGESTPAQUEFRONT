import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CheckDeliveryComponent } from '../check-delivery/check-delivery.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
  providers: [DialogService]
})
export class DriverComponent implements OnDestroy,OnInit{
  ref: DynamicDialogRef | undefined;
  identification: string = ""
  user: string = "";
  constructor(public dialogService:DialogService, private route: ActivatedRoute){}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.identification = params['identification'];
      this.user = this.identification + "@correo.com"
    });
  }
  ngOnDestroy(): void {
    if(this.ref){
      this.ref.close();
    }
  }
  CheckDeliveryC(){
    this.ref = this.dialogService.open(CheckDeliveryComponent, {
      header: 'Registra entrega de paquetes',
      data:{
        identification: this.identification        
      }
    })
  }
}
