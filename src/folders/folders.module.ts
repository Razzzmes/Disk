import {forwardRef, Module} from '@nestjs/common';
import { FoldersController } from './folders.controller';
import { FoldersService } from './folders.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {Folder} from "./folders.model";
import {JwtModule} from "@nestjs/jwt";
import {AuthModule} from "../auth/auth.module";
import {File} from "../files/files.model";

@Module({
  controllers: [FoldersController],
  providers: [FoldersService],
  imports: [
    SequelizeModule.forFeature([User, Folder, File]),
    forwardRef(() => AuthModule),
    JwtModule
  ],
  exports: [FoldersService]
})
export class FoldersModule {}
