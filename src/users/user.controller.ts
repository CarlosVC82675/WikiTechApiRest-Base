import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/createuser.dto";


@Controller('users')

export class UserController {

    constructor(private userService: UserService){}

    @Post()
    async createUser(@Body() user: CreateUserDTO){
        return this.userService.createUser(user);

    }


}