import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {VaccineCenter, VaccineCenterDocument} from "./schema/vaccine_center.schema";
import {AssignNewVaccineCenterDTO} from "./dto/assignNewVaccineCenterDTO";




@Injectable()
export class VaccineCenterService {
    constructor(@InjectModel(VaccineCenter.name) private vaccineCenterModel: Model<VaccineCenterDocument>) {}

    async create(dto: AssignNewVaccineCenterDTO): Promise<VaccineCenter> {
        const newVaccineCenter : VaccineCenter = {
            name : dto.name,
            vaccine_center_id : dto.vaccine_center_id,
            current_capacity : 0,
            total_capacity : dto.total_capacity,
        };
        const createdVaccineCenter = new this.vaccineCenterModel(newVaccineCenter);
        return createdVaccineCenter.save();
    }

    async findAll(): Promise<VaccineCenter[]> {
        return this.vaccineCenterModel.find().exec();
    }

}
