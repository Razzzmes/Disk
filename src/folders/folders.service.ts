import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Folder} from "./folders.model";
import {CreateFolderDto} from "./dto/create-folder.dto";
import {UpdateFolderDto} from "./dto/update-folder.dto";
import {File} from "../files/files.model";


@Injectable()
export class FoldersService {

    constructor(@InjectModel(Folder) private folderRepository: typeof Folder) {}

    async createRootFolder(userId: number) {
        return await this.folderRepository.create({name: 'root', userId: userId, parentId: null})
    }

    async createFolder(folderId: number, dto: CreateFolderDto, userId: number){
        await this.checkFolder(folderId, userId);
        return await this.folderRepository.create({ ...dto, userId: userId, parentId: folderId});
    }

    async getOneFolder (folderId: number, userId: number){
        const folder = await this.checkFolder(folderId, userId);
        const childFolders = await this.folderRepository.findAll({where: {parentId: folderId}, include: {model: File}});
        return { folder, childFolders };
    }

    async deleteFolder(folderId: number, userId: number) {
        await this.exceptionForRoot(folderId, userId);
        await this.folderRepository.destroy({where: {id: folderId}});
        return {message: 'Папка удалена'}
    }

    async updateFolder(folderId: number, dto: UpdateFolderDto, userId: number){
        await this.exceptionForRoot(folderId, userId);
        await this.folderRepository.update(dto,{where: {id: folderId}})
        return await this.folderRepository.findAll({where: {id: folderId}})
    }

    async checkFolder(folderId: number, userId: number){
        const check = await this.folderRepository.findOne({where: {id: folderId}, include: {model: File}})
        if(!check || check.userId !== userId){
            throw new BadRequestException({massage:'Папка не существует'})
        }
        return check;
    }

    async exceptionForRoot(folderId: number, userId: number){
        const folder = await this.checkFolder(folderId, userId);
        if(folder.parentId == null) {
            throw new BadRequestException({massage:'Эту папку удалить или редактировать нельзя'})
        }
    }
}