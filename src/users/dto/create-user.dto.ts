import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'oleg228@mail.ru', description: 'Почтовый адрес'})
    readonly email: string;
    @ApiProperty({example: 'OleG_228ru', description: 'Пароль'})
    readonly password: string;
}