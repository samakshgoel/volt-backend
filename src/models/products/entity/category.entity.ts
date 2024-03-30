import { UUID } from "crypto";
import { Model, Table , Column, PrimaryKey, Default, DataType} from "sequelize-typescript";


@Table
export class Category extends Model{
    
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    categoryId: UUID;

    @Column
    nameEn : string;

    @Column
    nameUz : string;

    @Column
    image : string

    @Column
    categoryOrder : number

    @Default(true)
    @Column
    isActive : boolean

}