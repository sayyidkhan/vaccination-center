import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {CatsModule} from "./cat/cat.module";
import {VaccineCenterModule} from "./vaccine_center/vaccine_center.module";

@Module({
  imports: [
      MongooseModule.forRoot("mongodb://admin:pass@localhost:2717/vaccination?authSource=admin"),
      //add new modules below here
      CatsModule,
      VaccineCenterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
