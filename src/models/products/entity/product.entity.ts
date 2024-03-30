import { UUID } from "crypto";
import { Model, Table , Column, PrimaryKey, Default, DataType} from "sequelize-typescript";


@Table
export class Product extends Model{
    
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    productId: UUID;

    @Column
    nameEn : string;

    @Column
    nameUz : string;

    @Column
    image : string

    @Column
    price : number

    @Column
    count : number

    @Column
    rating : number

    @Default(true)
    @Column
    isActive : boolean

}