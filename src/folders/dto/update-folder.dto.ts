import {IsNumber, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateFolderDto {
    @ApiProperty({example: 'Pictures', description: 'Название папки'})
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({example: '3', description: 'Идентификатор родительской папки'})
    @IsNumber()
    @IsOptional()
    parentId?: number;
}