import { Module } from '@nestjs/common';
import { ConverterService } from './converter.service';
import { ScoreConversionService } from './score-conversion.service';
import { ConverterController } from './converter.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Converter, ConverterSchema } from './converter.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name: Converter.name, schema: ConverterSchema}
  ])],
  providers: [ConverterService, ScoreConversionService],
  controllers: [ConverterController]
})
export class ScoreConversionModule {}
