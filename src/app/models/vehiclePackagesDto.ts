import { PackageToDeliverDto } from "./packageToDeliverDto";

export interface VehiclePackagesDto{
    license_plate: string,
    name_trip: string,
    id_trip: number,
    packages: PackageToDeliverDto[]
};

