import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VaccineCenterDocument = VaccineCenter & Document;

@Schema()
export class VaccineCenter {
    @Prop()
    name: string;

    @Prop()
    id: number;

}

export const VaccineCenterSchema = SchemaFactory.createForClass(VaccineCenter);
