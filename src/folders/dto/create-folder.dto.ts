import {ApiProperty} from "@nestjs/swagger";

export class CreateFolderDto {
    @ApiProperty({example: 'Pictures', description: 'Название папки'})
    readonly name: string;
}