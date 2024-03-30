import { Inject, Injectable } from "@nestjs/common";
import { User } from "./entity/user.enitity";

@Injectable()
export class UserService{

    constructor(
        @Inject('USER_REPOSITORY')
        private userModel : typeof User
    ){}

    async createUser(userDetail:any) {
        return await this.userModel.create(userDetail);
    }

    async getUserByMail(email : string ){
        return await this.userModel.findOne({
            where :{email}
        })
    }
}