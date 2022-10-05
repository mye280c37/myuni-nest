import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsObject, IsArray } from "class-validator";
import { AdditionalInfo } from "src/additional-info/additional-info.schema";
import { UserDocument } from "src/user/user.schema";
import { ConsultingRequestDocument } from "../schemas/consulting-request.schema";

export class ConsultingRequestResponseDto {

    constructor (user: UserDocument, consultingReq: ConsultingRequestDocument){
        this.user = user;
        this.consultingRequest = consultingReq;
    }

    user: UserDocument;
    consultingRequest: ConsultingRequestDocument

}
