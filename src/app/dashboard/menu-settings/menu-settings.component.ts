import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-menu-settings',
  templateUrl: './menu-settings.component.html',
  styleUrls: ['./menu-settings.component.css'],
  providers: [MessageService]
})
export class MenuSettingsComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private messageService: MessageService, private router: Router) {}
  ngOnInit(): void {
    this.items = [
      {
          label: 'Cerrar sesion',
          icon: 'pi pi-sign-out',
          command: () =>{
            this.update();
          }
      }
  ];
  }

  update(){    
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Log out' });
    this.router.navigate(['/login'])
  }
}
