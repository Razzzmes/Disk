import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Folder} from "../folders/folders.model";
import {ApiProperty} from "@nestjs/swagger";

interface FileCreationAttrs {
    name: string,
    filepath: string,
    folderId: number
}

@Table({tableName:'files'})
export class File extends Model<File, FileCreationAttrs>{
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Cute cat.jpg', description: 'Название файла'})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: 'uploads/Cute cat.jpg', description: 'Путь файла на сервере'})
    @Column({type: DataType.STRING, allowNull: false})
    filepath: string;

    @ApiProperty({example: '5', description: 'Идентификатор папки'})
    @ForeignKey(() => Folder)
    @Column({type: DataType.INTEGER})
    folderId: number;

    @BelongsTo(() => Folder)
    folder: Folder;
}