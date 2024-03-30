import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Module, OnModuleInit } from '@nestjs/common';
import { User } from '../models/users/entity/user.enitity';
import { Category } from '../models/products/entity/category.entity';
import { Product } from '../models/products/entity/product.entity';
import { ProductCategoryAssociation } from '../models/products/entity/product-category-association.entity';


@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'volt_db',
        autoLoadModels: true,
        logging: false,
        // synchronize: true, // For development only
      }),
    }),
    SequelizeModule.forFeature([
      User, 
      Category , 
      Product,
      ProductCategoryAssociation
    ]),
  ],
})
export class DatabaseModule implements OnModuleInit {
  constructor(private readonly sequelizeModule: Sequelize) {}

  async onModuleInit() {
    try {
      await this.sequelizeModule.authenticate();
      console.log('Database connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
}