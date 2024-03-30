import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './models/auth/auth.module';
import { UserModule } from './models/users/user.module';
import { ProductModule } from './models/products/product.module';

@Module({
  imports: [UserModule ,DatabaseModule, AuthModule , ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
