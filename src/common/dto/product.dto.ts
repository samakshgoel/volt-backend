import { IsString , IsEnum, IsUUID} from "class-validator";
import { UUID } from "crypto";

enum LANGUAGE_ENUM {
    'en',
    'uz'
  }

export class CategoryDto {
    
    @IsEnum(LANGUAGE_ENUM)
    @IsString()
    language : string

}

export class ProductListDto{

    @IsUUID()
    categoryId : UUID

    @IsEnum(LANGUAGE_ENUM)
    @IsString()
    language : string
}

