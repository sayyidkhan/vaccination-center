import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {VaccineCenterModule} from "./vaccine_center/vaccine_center.module";
import {BookingModule} from "./booking/booking.module";

@Module({
  imports: [
      MongooseModule.forRoot("mongodb://admin:pass@localhost:2717/vaccination?authSource=admin"),
      //add new modules below here
      BookingModule,
      VaccineCenterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
