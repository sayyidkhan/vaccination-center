import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookingDocument = Booking & Document;

@Schema()
export class Booking {
    @Prop()
    nric: string;

    @Prop()
    full_name: string;

    @Prop()
    vaccine_center_id: number;

    @Prop()
    booking_date: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
