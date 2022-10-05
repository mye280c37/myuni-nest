import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScoreConversionRequestDto } from './dto/score-conversion.request.dto';
import { ScoreConversionResponseDto } from './dto/score-conversion.response.dto';
import { Converter } from './converter.schema';

@Injectable()
export class ScoreConversionService {
    constructor(
        @InjectModel('Converter') private readonly converterModel: Model<Converter>,
    ){}

    async getTypeZero(kor: number, eng: number, his: number, math: number, society: number, science: number, select: number): Promise<ScoreConversionResponseDto[]>{
        // avg 구해서 함수 통과시키기

        const conversions = [];
        await this.converterModel.find({ type: 0 }).exec()
        .then((documents) => {
            documents.map(doc => {
                const avg = (kor * doc.weight[0] + eng * doc.weight[1] +
                    his * doc.weight[2] + math * doc.weight[3] + society * doc.weight[4] + science * doc.weight[5] + select * doc.weight[6]) / (doc.weight.reduce((a, b) => a + b, 0));
                const converted = Function(doc.func)(avg);
                conversions.push(new ScoreConversionResponseDto(doc, converted));
            });
        })
        .catch(err => {
            console.log("typeZero", err);
        });

        return conversions;
    }

    async getTypeOne(kor: number, eng: number, his: number, math: number, society: number, science: number, select: number): Promise<ScoreConversionResponseDto[]>{
        // avg 구해서 함수 통과시키기
        const conversions = [];
        let scores = [kor, eng, math, society, science, his, select];
        await this.converterModel.find({ type: 1 }).exec()
            .then((documents) => {
                documents.map(doc => {
                    let hab = 0, idx = 0;
    
                    const resultScore = scores.map(score => {
                        for (var i = 0; i < doc.standard.length; i++){
                            if (score >= doc.standard[i]) {
                                return doc.result[i];
                            }
                        }
                    })
    
                    for (var i = 0; i < doc.weight.length; i++){
                        resultScore[i] *= doc.weight[i];
                        hab += doc.weight[i];
                    }
                    
                    const converted = resultScore.reduce((a, b) => a + b, 0); 
    
                    conversions.push(new ScoreConversionResponseDto(doc, converted));
                });
            })
            .catch(err => {
                console.log(err);
            });
        return conversions;
    }

    // type 2 : Avg Score --> Converted Score and make AVERAGE
    async getTypeTwo(kor: number, eng: number, his: number, math: number, society: number, science: number, select: number): Promise<ScoreConversionResponseDto[]>{
        let scores = [kor, eng, math, society, science, his, select];
        const conversions = [];
        await this.converterModel.find({ type: 2 }).exec()
            .then((documents) => {
                documents.map(doc => {
                    let thisScores = scores.map(score => score);
                    let hab = 0, weightHab = 0;
                    
                    for (var i = 0; i < doc.weight.length; i++) {
                        thisScores[i] *= doc.weight[i];
                        hab += thisScores[i];
                        weightHab += doc.weight[i];
                    }

                    const avgScore = hab / weightHab;

                    for (var i = 0; i < doc.standard.length; i++) {
                        if (avgScore >= doc.standard[i]) {
                            conversions.push(new ScoreConversionResponseDto(doc, doc.result[i]));
                        };
                    };
                });
            })
            .catch(err => {
                console.log(err);
            });
        
        return conversions;
    };

    // type 3 : Each Score --> Grade and Make that AVERAGE
    async getTypeThree(kor: number, eng: number, his: number, math: number, society: number, science: number, select: number): Promise<ScoreConversionResponseDto[]> {
        let scores = [kor, eng, math, society, science, his, select];
        const conversions = [];

        await this.converterModel.find({ type: 3 }).exec()
            .then((documents) => {

                documents.map(doc => {
                    let gradeSum = 0, weightSum = 0;
                    let grade = scores.map(score => {
                        for (var i = 0; i < doc.standard.length; i++) {
                            if (score >= doc.standard[i])
                                return doc.result[i];
                        }
                    })

                    for (var i = 0; i < doc.weight.length; i++) {
                        gradeSum += (grade[i] * doc.weight[i]);
                        weightSum += doc.weight[i];
                    }

                    const converted = gradeSum / weightSum;
                    
                    conversions.push(new ScoreConversionResponseDto(doc, converted));
                });
            })
            .catch(err => {
                console.log(err);
            });
        
        return conversions;
    };

    async getTypeFour(kor: number, eng: number, his: number, math: number, society: number, science: number, select: number): Promise<ScoreConversionResponseDto[]> {
        let scores: number[] = [kor, eng, math, his, society, science, select];
        const conversions = [];
        await this.converterModel.find({type:4}).exec()
            .then((documents) => {
    
                documents.map(doc => {
                    let hab = 0, weightHab = 0, thisScores = scores.map(x=>x);
                    // weight 곱하기 + type 4니까 avg grade ㄱㄱ
                    for (var i = 0; i < scores.length; i++) {
                        thisScores[i] *= doc.weight[i];
                        hab += thisScores[i];
                        weightHab += doc.weight[i];
                    }
                    
                    let avg = hab / weightHab, converted;
    
                    for (var i = 0; i < doc.standard.length; i++) {
                        if (avg >= doc.standard[i]) {
                            converted = doc.result[i];
                            break;
                        }
                    }
                    
                    conversions.push(new ScoreConversionResponseDto(doc, converted));
                });
            })
            .catch(err => {
                console.log(err);
            });
        
        return conversions;
    };
    
    // Total Score Function 
    async getTypeFive(kor: number, eng: number, his: number, math: number, society: number, science: number, select: number): Promise<ScoreConversionResponseDto[]> {
        const conversions: ScoreConversionResponseDto[] = [];
        // avg 구해서 함수 통과시키기
        await this.converterModel.find({ type: 5 })
            .then((documents) => {
                documents.map(doc => {
                    const totalWeightedScore: number = (kor * doc.weight[0] + eng * doc.weight[1] +
                        his * doc.weight[2] + math * doc.weight[3] + society * doc.weight[4] + science * doc.weight[5] + select * doc.weight[6]);
                        const converted = totalWeightedScore / 700 * 212 + 188;

                    conversions.push(new ScoreConversionResponseDto(doc, converted));
                });
            })
            .catch(err => {
                console.log(err);
            });
        
        return conversions;
    };
    
    async getByScore(scoreConversionReqDto: ScoreConversionRequestDto): Promise<ScoreConversionResponseDto[]> {
        const conversions = [];
        const {korean, english, math, society, science, history, select} = scoreConversionReqDto;
        conversions.push(...await this.getTypeZero(korean, english, math, society, science, history, select));
        conversions.push(...await this.getTypeOne(korean, english, math, society, science, history, select));
        conversions.push(...await this.getTypeTwo(korean, english, math, society, science, history, select));
        conversions.push(...await this.getTypeThree(korean, english, math, society, science, history, select));
        conversions.push(...await this.getTypeFour(korean, english, math, society, science, history, select));
        conversions.push(...await this.getTypeFive(korean, english, math, society, science, history, select));
        return conversions;
    }
}
