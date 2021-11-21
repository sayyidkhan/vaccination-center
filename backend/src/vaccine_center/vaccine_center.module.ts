import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {VaccineCenter, VaccineCenterSchema} from "./schema/vaccine_center.schema";
import {VaccineCenterController} from "./vaccine_center.controller";
import {VaccineCenterService} from "./vaccine_center.service";



@Module({
    imports: [MongooseModule.forFeature([{ name: VaccineCenter.name, schema: VaccineCenterSchema }])],
    controllers: [VaccineCenterController],
    providers: [VaccineCenterService],
})
export class VaccineCenterModule {}
