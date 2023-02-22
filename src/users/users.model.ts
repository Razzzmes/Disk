import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {Folder} from "../folders/folders.model";
import {ApiProperty} from "@nestjs/swagger";

interface  UserCreationAttrs{
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs>{
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'oleg228@mail.ru', description: 'Почтовый адрес'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: 'OleG_228ru', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @HasMany(() => Folder)
    folders: Folder[];
}