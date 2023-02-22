import {Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards} from '@nestjs/common';
import {FoldersService} from "./folders.service";
import {CreateFolderDto} from "./dto/create-folder.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UpdateFolderDto} from "./dto/update-folder.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Folder} from "./folders.model";

@ApiTags('Folders')
@Controller('folders')
export class FoldersController {

    constructor(private foldersService: FoldersService) {}

    @ApiOperation({summary:'Создание папки'})
    @ApiResponse({status: 200, type: Folder})
    @UseGuards(JwtAuthGuard)
    @Post(':id')
    async create(@Param('id') id: number, @Body() folderDto: CreateFolderDto, @Req() req){
        return this.foldersService.createFolder(id, folderDto, req.user.id);
    }

    @ApiOperation({summary:'Вывод папки'})
    @ApiResponse({status: 200, type: [Folder]})
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getOne(@Param('id') id: number, @Req() req){
        return this.foldersService.getOneFolder(id, req.user.id);
    }

    @ApiOperation({summary:'Удаление папки'})
    @ApiResponse({status: 200, description:'"message": "Папка удалена"'})
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number, @Req() req){
        return this.foldersService.deleteFolder(id, req.user.id);
    }

    @ApiOperation({summary:'Изменение папки'})
    @ApiResponse({status: 200, type: Folder})
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Param('id') id: number, @Body() folderDto: UpdateFolderDto, @Req() req){
        return this.foldersService.updateFolder(id, folderDto, req.user.id);
    }
}
