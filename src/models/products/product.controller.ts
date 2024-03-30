import { Controller, Get, HttpStatus, Query, Res, UseGuards } from "@nestjs/common";
import {Response } from "express";
// import { JwtAuthGuard } from "../auth/jwt-auth.guard";
// import { RolesGuard } from "../auth/role.guard";
import { UserRoles } from "../auth/roles.enum";
import { ProductService } from "./product.service";
import { CategoryDto } from "src/common/dto/product.dto";
import { ProductListDto } from "src/common/dto/product.dto";

@Controller('/product')
export class ProductController {

    constructor(
        private readonly productService : ProductService
    ){}

    // @UseGuards(JwtAuthGuard)
    // @UseGuards(RolesGuard)
    @Get('/category')
    async getProductCategory(@Query() categoryDto : CategoryDto, @Res() res : Response) {
        
       const categoryDetails =  await this.productService.getCategory(categoryDto.language);
       return res.status(HttpStatus.OK).send({
                statusCode : HttpStatus.OK,
                categoryDetails : categoryDetails
            })
    }

    @Get('/product-list')
    async getProductList(@Query() productListDto : ProductListDto ,@Res() res : Response){
        
        let productList = await this.productService.getProductList(productListDto.language, productListDto.categoryId);

         return res.status(HttpStatus.OK).send({
            statusCode : HttpStatus.OK,
            productList : productList
         });  

    }

}