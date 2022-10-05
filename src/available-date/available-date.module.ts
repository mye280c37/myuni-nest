import { Module } from '@nestjs/common';
import { AvailableDateService } from './available-date.service';
import { AvailableDateController } from './available-date.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AvailableDate, AvailableDateSchema } from './available-date.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name: AvailableDate.name, schema: AvailableDateSchema},
  ])],
  providers: [AvailableDateService],
  controllers: [AvailableDateController]
})
export class AvailableDateModule {}
