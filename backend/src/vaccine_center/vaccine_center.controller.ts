import {Body, Controller, Get, Post} from "@nestjs/common";
import {VaccineCenter} from "./schema/vaccine_center.schema";
import {VaccineCenterService} from "./vaccine_center.service";
import {AssignNewVaccineCenterDTO} from "./dto/assignNewVaccineCenterDTO";


@Controller("vaccine_center")
export class VaccineCenterController {
    constructor(private readonly vaccineCenterService: VaccineCenterService) {
    }

    @Get("all")
    async getAllVaccineCenters(): Promise<VaccineCenter[]> {
        const vaccineCenterList: VaccineCenter[] = await this.vaccineCenterService.findAll();
        if (vaccineCenterList !== undefined) {
            return vaccineCenterList;
        }
        return [];
    }

    @Post("assign")
    async assignANewVaccineCenter(@Body() dto: AssignNewVaccineCenterDTO): Promise<VaccineCenter> {
        const vaccineCenter: VaccineCenter = await this.vaccineCenterService.create(dto);
        if (vaccineCenter !== undefined) {
            return vaccineCenter;
        } else {
            return null;
        }
    }

}
