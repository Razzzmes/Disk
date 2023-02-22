import {Controller, Delete, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {FilesService} from "./files.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {File} from "./files.model";


@ApiTags('Files')
@Controller('files')
export class FilesController {

    constructor(private filesService: FilesService) {}

    @ApiOperation({summary:'Добавление файла'})
    @ApiResponse({status: 200, type: File})
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('name'))
    @Post(':id/upload')
    async create(@Param('id') id: number, @UploadedFile() file: Express.Multer.File, @Req() req) {
        return this.filesService.createFile(id, req.user.id, file);
    }

    @ApiOperation({summary:'Удаление файла'})
    @ApiResponse({status: 200, description: 'message: \'Файл удален\''})
    @UseGuards(JwtAuthGuard)
    @Delete(':folderId/:id')
    async delete(@Param('id') id: number, @Param('folderId') folderId: number, @Req() req) {
        return this.filesService.deleteFile(folderId, id, req.user.id);
    }
}