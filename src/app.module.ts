import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import { AuthModule } from './auth/auth.module';
import { FoldersModule } from './folders/folders.module';
import {Folder} from "./folders/folders.model";
import { FilesModule } from './files/files.module';
import {File} from "./files/files.model";


@Module({
    controllers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Folder, File],
            autoLoadModels: true
        }),
        UsersModule,
        AuthModule,
        FoldersModule,
        FilesModule,
    ],
})
export class AppModule {}