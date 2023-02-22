import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import {File} from "../files/files.model";
import {ApiProperty} from "@nestjs/swagger";

interface  FolderCreationAttrs{
    name: string;
    userId: number;
    parentId: number;
}

@Table({tableName: 'folders'})
export class Folder extends Model<Folder, FolderCreationAttrs>{
    @ApiProperty({example: '8', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Pictures', description: 'Название папки'})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: '4', description: 'Уникальный идентификатор пользователя'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @ApiProperty({example: '3', description: 'Идентификатор родительской папки'})
    @Column({type: DataType.INTEGER, defaultValue: null, allowNull: true})
    parentId: number;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => File)
    files: File[];
}