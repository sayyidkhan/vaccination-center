import {Body, Controller, Get, Post} from "@nestjs/common";
import {Booking} from "./schema/booking.schema";
import {BookingService} from "./booking.service";
import {CreateBookingDTO} from "./dto/bookingDTO";



@Controller("booking")
export class BookingController {
    constructor(private readonly bookingService : BookingService) {}

    @Post("/create_new")
    async createNewCat(@Body() dto: Booking) : Promise<Booking> {
        const booking : Booking = await this.bookingService.create(dto);
        if(booking !== undefined){
            return booking;
        }
        else {
            return null;
        }
    }

}
