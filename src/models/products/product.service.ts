import { Inject, Injectable } from "@nestjs/common";
import { Category } from "./entity/category.entity";
import { Op, Sequelize } from "sequelize";
import { ProductCategoryAssociation } from "./entity/product-category-association.entity";
import { Product } from "./entity/product.entity";

@Injectable()
export class ProductService {

    constructor(
        @Inject('CATEGORY_REPOSITORY')
        private categoryModel: typeof Category ,

        @Inject('PRODUCT_CATEGORY_REPOSITORY')
        private productCategoryModel : typeof ProductCategoryAssociation ,

        @Inject('PRODUCT_REPOSITORY')
        private productModel : typeof Product
    ) { }

    async getCategory(language: string) {
        let attributes : any = ['categoryId', 'image', 'categoryOrder', 'isActive'] ;

        if(language === 'en') attributes.push(['nameEn', 'name']) ;
        else attributes.push(['nameUz', 'name']) ;


        return await this.categoryModel.findAll({
            attributes : attributes,
            where: { isActive: true }
        });
    }

    async getProductList(language : string , categoryId : string){

        let productAttributes : any = ['productId', 'image', 'price', 'count', 'rating', 'isActive'];

        if(language === 'en') productAttributes.push(['nameEn', 'name'])
        else productAttributes.push(['nameUz', 'name'])


        return await this.productCategoryModel.findAll({
            attributes:['productId', 'categoryId'],
            where :{categoryId : categoryId }
        })
        .then(async productCategoryDetails=>{
            productCategoryDetails = JSON.parse(JSON.stringify(productCategoryDetails));
            
            return await this.productModel.findAll({
                attributes : productAttributes,
                where : {
                    productId: {
                        [Op.in]: (()=>productCategoryDetails.map(productCategory=> productCategory.productId))(),
                    },
                    isActive : true
                }
            })

        })
    }

}