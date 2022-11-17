import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsultingRequestController } from './consulting-request.controller';
import { ConsultingRequest, ConsultingRequestSchema } from './schemas/consulting-request.schema';
import { ConsultingRequestService } from './consulting-request.service';
import { AvailableDate, AvailableDateSchema } from 'src/available-date/available-date.schema';
import { AvailableDateService } from 'src/available-date/available-date.service';

@Module({
  imports: [MongooseModule.forFeature([
    {name: ConsultingRequest.name, schema: ConsultingRequestSchema},
    {name: AvailableDate.name, schema: AvailableDateSchema}
  ])],
  controllers: [ConsultingRequestController],
  providers: [ConsultingRequestService, AvailableDateService]
})
export class ConsultingRequestModule {}
