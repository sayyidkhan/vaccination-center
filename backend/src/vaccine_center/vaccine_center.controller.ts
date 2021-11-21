import {Body, Controller, Get, Post} from "@nestjs/common";
import {VaccineCenter} from "./schema/vaccine_center.schema";


@Controller("vaccine_center")
export class VaccineCenterController {
    constructor() {}

    @Get("all")
    async getAllVaccineCenters() : Promise<VaccineCenter[]> {
        const result  : VaccineCenter[] = [
            { name: "None", id: 0},
            { name: "Bukit Batok CC", id: 1 },
            { name: "Bukit Panjang CC", id: 2 },
            { name: "Bukit Timah CC", id: 3 },
            { name: "Outram Park Polyclinic", id: 4 },
        ];
        return result;
    }

}
