import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PackageDto } from 'src/app/models/packageDto';
import { ZoneDto } from 'src/app/models/zoneDto';
import { InventoryService } from 'src/app/services/inventory.service';
import { ZoneService } from 'src/app/services/zone.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  providers: [ MessageService]
})
export class InventoryComponent implements OnInit{
  zones: ZoneDto[] | undefined;
  selectedZone: ZoneDto | undefined;
  newPackage: PackageDto | undefined;
  category: string = "";
  disable: boolean =false;
  uploadedFiles: File[] = [];
  constructor(private messageService:MessageService, private zoneService: ZoneService, private inventoryService: InventoryService, public ref: DynamicDialogRef){}
  ngOnInit(): void {
    this.getZones()
  }

  getZones(){
    this.zoneService.getZones().subscribe(
      zones => this.zones = [...zones]
    )
  }

  addInventory(){
    this.newPackage={
      category: this.category,
      id_zone: this.selectedZone?.id
    }
    this.inventoryService.addPackage(this.newPackage).subscribe(
      {
        next: _ => {
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: `Se registro correctamente el paquete al inventario` });
          this.disable = true
          setTimeout(() => {             
            this.ref.close()
          }, 1500);
        },
        error: error => {            
          console.error(error);
          this.messageService.add({ severity: 'error', summary: 'Reject', detail: `${ error.message}` });
      }
      }
    )
    this.selectedZone = undefined;
    this.category = "";
  }

  uploadFile(event: any) {
    this.uploadedFiles = event.files;
    this.disable = true;
    this.inventoryService.uploadInventory(this.uploadedFiles[0]).subscribe(
      {        
        next: result => {          
          this.messageService.add({ severity: 'info', summary: 'Success', detail: `${result}` });   
          this.disable = false;       
        },
        error: error => {
          this.messageService.add({ severity: 'error', summary: 'Reject', detail: `${error.message}` });
        }        
      }
    )

  }

}
