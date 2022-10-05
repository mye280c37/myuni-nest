import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.schema';
import { ConsultingRequestController } from './consulting-request.controller';
import { ConsultingRequest, ConsultingRequestSchema } from './schemas/consulting-request.schema';
import { ConsultingRequestService } from './consulting-request.service';

@Module({
  imports: [MongooseModule.forFeature([
    {name: User.name, schema: UserSchema},
    {name: ConsultingRequest.name, schema: ConsultingRequestSchema}
  ])],
  controllers: [ConsultingRequestController],
  providers: [ConsultingRequestService]
})
export class ConsultingRequestModule {}
