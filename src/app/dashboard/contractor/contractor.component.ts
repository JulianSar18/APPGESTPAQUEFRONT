import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ContractorService } from 'src/app/services/contractor.service';
import { ContractorDto } from 'src/app/models/contractorDto';
import { VehicleDriverDto } from 'src/app/models/vehicleDriverDto';
import { MessageService } from 'primeng/api';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-contractor',
  templateUrl: './contractor.component.html',
  styleUrls: ['./contractor.component.css'],
  providers: [MessageService]
})
export class ContractorComponent implements OnInit {
  uploadedFiles: File[] = [];
  companies: ContractorDto[] | undefined;
  selectedCompanie: ContractorDto | undefined;
  companyName: string = "";
  nit: string = "";
  newCompanie: ContractorDto | undefined;
  licensePlate: string = "";
  driverName: string = "";
  identification: string = "";
  newVehicledriver: VehicleDriverDto | undefined;
  disable: boolean = false;
  disable_button: boolean = false;
  constructor(private contractorService: ContractorService, private messageService: MessageService, public ref: DynamicDialogRef) { }
  ngOnInit() {
    this.getCompanies();
  }

    

  getCompanies() {
    this.contractorService.getCompanies().subscribe(
      companies => {
        this.companies = [...companies]
      }
    )
  }

  createCompanie() {
    this.newCompanie = {
      nit: this.nit,
      company_name: this.companyName
    };
    this.contractorService.createCompanie(this.newCompanie).subscribe(
      (_) => {
        this.messageService.add({ severity: 'info', summary: 'Correcto', detail: `se creo la empresa` }); 
        this.getCompanies();
      }
    )
    this.companyName = "";
    this.nit = "";
  }

  createVehicleDriver() {
    this.newVehicledriver = {
      nit: this.selectedCompanie?.nit,
      driver_name: this.driverName,
      identification_card: this.identification,
      license_plate: this.licensePlate.toUpperCase()
    };
    this.contractorService.createVehicledriver(this.newVehicledriver).subscribe(
      (_) => {
        this.messageService.add({ severity: 'info', summary: 'Correcto', detail: 'Se añadio correctamente el conductor' }); 
      }
    )
    this.selectedCompanie = undefined;
    this.driverName = "";
    this.identification = "";
    this.licensePlate = "";
  }

  uploadFile(event: any) {
    this.uploadedFiles = event.files;
    this.disable = true;
    this.contractorService.createVehiclesDrivers(this.uploadedFiles[0]).subscribe(
      {        
        next: result => {          
          this.messageService.add({ severity: 'info', summary: 'Correcto', detail: `${result}` });   
          this.disable = true;    
          this.disable_button = true;  
          setTimeout(() => {
            this.ref.close();
          }, 1000);
          
        },
        error: error => {
          this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: `${error.message}` });
        }        
      }
    )

  }
}
