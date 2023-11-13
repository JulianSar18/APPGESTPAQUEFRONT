import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  constructor() { }
  private refreshSummaryTrip = new BehaviorSubject<boolean>(false);

  setRefreshSummaryTrip(value: boolean) {
    this.refreshSummaryTrip.next(value);
  }

  getRefreshSummaryTrip() {
    return this.refreshSummaryTrip.asObservable();
  }
}
