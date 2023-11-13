import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministratorComponent } from './administrator/administrator.component';
import { CardModule } from 'primeng/card';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InventoryComponent } from './inventory/inventory.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ContractorComponent } from './contractor/contractor.component';
import { PaymentComponent } from './payment/payment.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { EntryComponent } from './entry/entry.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { LoadTripComponent } from './load-trip/load-trip.component';
import { MenuModule } from 'primeng/menu';
import { DriverComponent } from './driver/driver.component';
import { CheckDeliveryComponent } from './check-delivery/check-delivery.component';
import { MenuSettingsComponent } from './menu-settings/menu-settings.component';
import { HeaderPageComponent } from './header-page/header-page.component';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SummaryTripComponent } from './summary-trip/summary-trip.component';





@NgModule({
  declarations: [
    AdministratorComponent,
    InventoryComponent,
    ContractorComponent,
    PaymentComponent,
    SupervisorComponent,
    EntryComponent,
    LoadTripComponent,
    DriverComponent,
    CheckDeliveryComponent,
    MenuSettingsComponent,
    HeaderPageComponent,
    SummaryTripComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    DynamicDialogModule,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    InputNumberModule,
    ConfirmPopupModule,
    ToastModule,
    FileUploadModule,
    MenuModule,
    PaginatorModule,
    ConfirmDialogModule
  ]
})
export class DashboardModule { }
