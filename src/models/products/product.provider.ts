import {Category} from './entity/category.entity'
import { ProductCategoryAssociation } from './entity/product-category-association.entity';
import { Product } from './entity/product.entity';

export const productProviders = [
    {
      provide: 'CATEGORY_REPOSITORY',
      useValue: Category,
    },
    {
      provide: 'PRODUCT_CATEGORY_REPOSITORY',
      useValue: ProductCategoryAssociation,
    },
    {
      provide: 'PRODUCT_REPOSITORY',
      useValue: Product,
    },
    
  ];