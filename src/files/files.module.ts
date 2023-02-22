import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {File} from "./files.model";
import {Folder} from "../folders/folders.model";
import {FoldersModule} from "../folders/folders.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [FilesService],
  controllers: [FilesController],
  imports: [
      SequelizeModule.forFeature([File, Folder]),
      FoldersModule,
      AuthModule
  ]
})
export class FilesModule {}
