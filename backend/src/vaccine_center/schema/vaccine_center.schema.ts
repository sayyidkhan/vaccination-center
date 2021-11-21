import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VaccineCenterDocument = VaccineCenter & Document;

@Schema()
export class VaccineCenter {
    @Prop()
    name: string;

    @Prop()
    vaccine_center_id: number;

    @Prop()
    current_capacity : number;

    @Prop()
    total_capacity : number;

}

export const VaccineCenterSchema = SchemaFactory.createForClass(VaccineCenter);
