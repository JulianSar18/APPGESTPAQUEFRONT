import { Component, Input, OnInit } from '@angular/core';
import { SummaryTrip } from 'src/app/models/summaryTripDto';
import { RefreshService } from 'src/app/services/refresh.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-summary-trip',
  templateUrl: './summary-trip.component.html',
  styleUrls: ['./summary-trip.component.css']
})
export class SummaryTripComponent implements OnInit{
  totalEl: number = 0;
  currentPage: number = 1;
  trips!: SummaryTrip[];
  @Input() driver: string | undefined;
  constructor(private tripService: TripService, private refreshService : RefreshService){
  }
  ngOnInit(): void {
    this.getAllTrips(this.currentPage, this.driver);
    this.refreshService.getRefreshSummaryTrip().subscribe((shouldRefresh) => {
      if (shouldRefresh) {
        console.log("se refresco")
        this.getAllTrips(this.currentPage, this.driver);
      }
    });
  }
  
  getAllTrips(page: number, id_driver?: string){
    if(id_driver !== undefined || id_driver !== ""){
      this.tripService.getAllTrips(page, id_driver).subscribe({
        next: data => {
          this.trips = [...data.content]
          this.totalEl = data.totalElements
          console.log(this.totalEl)
        }
      })
    }else{
      this.tripService.getAllTrips(page).subscribe({
        next: data => {
          this.trips = [...data.content]
          this.totalEl = data.totalElements
          console.log(this.totalEl)
        }
      })
    }
    
  }

  onPageChange(event: any) {
    let current = this.currentPage = event.page + 1;
    this.getAllTrips(current);
  }

}
