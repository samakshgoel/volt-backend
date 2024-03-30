import { Module,forwardRef } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { userProviders } from "./user.provider";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports : [
        forwardRef(() => AuthModule)
    ],
    controllers : [UserController],
    providers : [UserService, ...userProviders],
    exports : [UserService],
})

export class UserModule {}
