import { Controller, Get, Post, Req, UseGuards , Body, ConsoleLogger, Res, HttpStatus} from "@nestjs/common";
import { UserService } from "../users/user.service";
import { Response } from "express";
import { UserSignDTO, UserSignUpDTO } from "../../common/dto/auth.dto";
import * as bcrypt from 'bcrypt';
import { AuthService } from "./auth.service";
import { User } from "../users/entity/user.enitity";
import { UserRoles } from "./roles.enum";


@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService : UserService,
        private readonly authService : AuthService
    ){}


    @Post('/sign-up')
    async signUp(@Body() userDetail : UserSignUpDTO, @Res() res : Response){
        let customDetail = JSON.parse(JSON.stringify(userDetail));

        let userExist = await this.userService.getUserByMail(customDetail.email);
        userExist = JSON.parse(JSON.stringify(userExist));

        if(userExist) return res.status(HttpStatus.CONFLICT).send({
            statusCode : HttpStatus.CONFLICT,
            message : 'USER already exist',
        })

        let user : any ;

        if(userDetail.loginType === 'google'){
            customDetail.emailVerified = true
            user = await this.userService.createUser(customDetail);

            /** Logic for sending mail */

        }else{
            if(! userDetail.password) return res.status(HttpStatus.PRECONDITION_FAILED).send({
                statusCode : HttpStatus.PRECONDITION_FAILED,
                message : 'Data is required.'
            });
            customDetail.emailVerified = false;
            const hash = await bcrypt.hash(customDetail.password, 10);
            customDetail.password = hash

            user = await this.userService.createUser(customDetail);

        }
        user = JSON.parse(JSON.stringify(user));
        let accessToken : string
        if(user && user.userId){
            accessToken = await this.authService.createJWT(user.userId, UserRoles.User);
        }

        return res.status(HttpStatus.CREATED).send({
            statusCode : HttpStatus.CREATED,
            message : 'USER Sign-up successfully',
            user,
            accessToken
        })
    }

    @Post('/sign-in')
    async signIn(@Body() userCredentials : UserSignDTO, @Res() res : Response){
        
        let userDetail : User = await this.userService.getUserByMail(userCredentials.email);
        userDetail = JSON.parse(JSON.stringify(userDetail));
        
        if(!userDetail || userCredentials.loginType !== userDetail.loginType) return res.status(HttpStatus.BAD_REQUEST).send({
            statusCode : HttpStatus.BAD_REQUEST ,
            message : "Wrong Credentials"
        })

        if(userDetail.loginType == 'password') {
            let passwordCorrect = await bcrypt.compare(userCredentials.password , userDetail.password)
            if(!passwordCorrect) return res.status(HttpStatus.EXPECTATION_FAILED).send({
                statusCode : HttpStatus.EXPECTATION_FAILED ,
                message : "Password does not match"
            })
        }

        let accessToken = await this.authService.createJWT(userDetail.userId, UserRoles.User);

        return res.status(HttpStatus.OK).send({
            statusCode : HttpStatus.OK ,
            user : userDetail,
            accessToken
        })

    }
}