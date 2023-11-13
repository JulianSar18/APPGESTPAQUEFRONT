import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType , MessageService } from 'primeng/api';
import { CommissionDto } from 'src/app/models/commissionDto';
import { ContractorDto } from 'src/app/models/contractorDto';
import { LiquidationDto } from 'src/app/models/liquidationDto';
import { CommissionService } from 'src/app/services/commission.service';
import { ContractorService } from 'src/app/services/contractor.service';
import { LiquidationService } from 'src/app/services/liquidation.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class PaymentComponent implements OnInit {
  constructor(private router: Router, private confirmationService: ConfirmationService, private contractorService: ContractorService, private commissionService: CommissionService, private liquidationService: LiquidationService, private messageService: MessageService) { }
  user: string = "Administrador@correo.com";
  companies: ContractorDto[] | undefined;
  selectedCompanie: ContractorDto | undefined;
  perDelivery: number | undefined;
  perTrip: number | undefined;
  newCommission: CommissionDto | undefined;
  liquidations!: LiquidationDto[];
  totalRecords: number = 0;
  currentPage: number = 1;
  ngOnInit(): void {
    this.getCompaniesWithOutCommission();
    this.getLiquidations(this.currentPage);
  }
  getCompaniesWithOutCommission() {
    this.contractorService.getCompaniesWithOutCommission().subscribe(
      companies => {
        this.companies = [...companies]
      }
    );
  }

  addcommisionsToCompany() {
    this.newCommission = {
      nit: this.selectedCompanie?.nit,
      per_delivery_commission: this.perDelivery,
      per_trip_commission: this.perTrip
    };

    this.commissionService.createCommissionToCompany(this.newCommission).subscribe({
      next: result => {
        this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: `Se creo la comision para la empresa con nit ${result.nit}` });
      },
      error: error => {
        this.messageService.add({ severity: 'error', summary: 'Reject', detail: `${error.message}` });
      }
    })
    this.selectedCompanie = undefined;
    this.perDelivery = undefined;
    this.perTrip = undefined;
  }

  getLiquidations(page: number) {
    this.liquidationService.getAllLiquidations(page).subscribe({
      next: data => {
        this.liquidations = [...data.content]
        this.totalRecords = data.totalElements
      }
    })
  }
  onPageChange(event: any) {
    let current = this.currentPage = event.first + 1;
    this.getLiquidations(current);
  }

  confirmDialog() {
    this.confirmationService.confirm({
        message: 'Realmente quiere calcular las liquidaciones a la fecha. <br>Recuerde que se realizan el primer día de cada mes',
        header: 'Confirmación',        
        acceptLabel: 'Si',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.liquidationService.calculateLiquidationsCompletedTrip().subscribe(
              {
                next: result =>{
                  this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: `${result}` });
                  this.ngOnInit();
                },
                error: error => {
                  this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: `${error}` });
                }
              }
            )
            
        },
        reject: (type : ConfirmEventType) => {
            switch(type){
              case ConfirmEventType.REJECT:
                this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'No se realizo ningun calculo' });
                        break;
              case ConfirmEventType.CANCEL:
                this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'Se cancelo la acción' });
                        break;
            }
        }
    });
}

  exportPdf() {
    this.liquidationService.exportPdf().subscribe(
      (data) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const currentDateTime = new Date().toLocaleString().replace(/ /g, '').replace(/:/g, '').replace(/,/g, '');
        const fileName = 'liquidations_' + currentDateTime + '.pdf';
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = fileName; 
        downloadLink.click();
      }
    )
  }

  goadministrator(){
    this.router.navigate(['/administrator'])
  }

  calculeManualLiquidation(){
    this.liquidationService.calculateLiquidationsCompletedTrip().subscribe(
      {
        next: _ => {
          this.ngOnInit();
        },
        error: error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error}` });
        }
      }
    )
  }
}


