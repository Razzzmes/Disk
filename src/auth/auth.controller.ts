import {Body, Controller, Post} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private  authService: AuthService) {}

    @ApiOperation({summary:'Логин'})
    @ApiResponse({status: 200, description:'"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluIiwiaWQiOjIsImlhdCI6MTY3NzA3MDU3OSwiZXhwIjoxNjc3MTU2OTc5fQ.UQxwRJGR9rlI1DBAA8tf_U4G_L9kENdJBLtlg5DIPzc"'})
    @Post('/login')
    login(@Body() userDto: CreateUserDto){
        return this.authService.login(userDto)
    }

    @ApiOperation({summary:'Регистрация'})
    @ApiResponse({status: 200, description:'"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluIiwiaWQiOjIsImlhdCI6MTY3NzA3MDU3OSwiZXhwIjoxNjc3MTU2OTc5fQ.UQxwRJGR9rlI1DBAA8tf_U4G_L9kENdJBLtlg5DIPzc"'})
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto){
        return this.authService.registration(userDto)
    }
}
