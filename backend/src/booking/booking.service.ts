import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Booking, BookingDocument} from "./schema/booking.schema";



@Injectable()
export class BookingService {
    constructor(@InjectModel(Booking.name) private bookingModel: Model<BookingDocument>) {}

    async create(booking: Booking): Promise<Booking> {
        const createdBooking = new this.bookingModel(booking);
        return createdBooking.save();
    }

    async findAll(): Promise<Booking[]> {
        return this.bookingModel.find().exec();
    }
}
