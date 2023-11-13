import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class Constants {

    public readonly API_URL_PARAMETRIC: string = "http://localhost:8081/api/parametric";
    public readonly API_URL_SUMMARY: string = "http://localhost:8081/api/summary";
    public readonly API_URL_TRACKING: string = "http://localhost:8081/api/tracking";
    public readonly API_URL_OPERATIONAL: string = "http://localhost:8081/api/operational";
    public readonly API_URL_LIQUIDATOR: string = "http://localhost:8081/api/liquidation";

}