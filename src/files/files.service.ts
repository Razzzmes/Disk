import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {File} from "./files.model";
import {FoldersService} from "../folders/folders.service";
import {ensureDir, remove, writeFile} from "fs-extra";

@Injectable()
export class FilesService {

    constructor(@InjectModel(File) private fileRepository: typeof File, private folderService: FoldersService){}

    async createFile(folderId: number, userId: number, file: any){
        await this.folderService.checkFolder(folderId, userId)
        await ensureDir(`${__dirname}/../uploads`);
        await writeFile(`${__dirname}/../uploads/${file.originalname}`, file.buffer);
        const filePath = `uploads/${file.originalname}`
        const fileName = file.originalname;
        return await this.fileRepository.create({folderId: folderId, name: fileName, filepath: filePath})
    }

    async deleteFile(folderId: number, fileId: number, userId: number){
        await this.folderService.checkFolder(folderId, userId)
        const file = await this.fileRepository.findOne({where: {id: fileId}})
        if(!file || file.folderId != folderId) {
            throw new BadRequestException({massage:'Файл не найден'});
        }
        await remove(`${__dirname}/../uploads/${file.name}`)
        await this.fileRepository.destroy({where: {id: fileId}});
        return {message: 'Файл удален'}
    }

}
