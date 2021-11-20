import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {CatsModule} from "./cat/cat.module";

@Module({
  imports: [
      MongooseModule.forRoot("mongodb://localhost:2717/vaccination"),
      //add new modules below here
      CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
