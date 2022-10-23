import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsultingRequestController } from './consulting-request.controller';
import { ConsultingRequest, ConsultingRequestSchema } from './schemas/consulting-request.schema';
import { ConsultingRequestService } from './consulting-request.service';

@Module({
  imports: [MongooseModule.forFeature([
    {name: ConsultingRequest.name, schema: ConsultingRequestSchema}
  ])],
  controllers: [ConsultingRequestController],
  providers: [ConsultingRequestService]
})
export class ConsultingRequestModule {}
